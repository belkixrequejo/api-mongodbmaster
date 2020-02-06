const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Usuario =  require('./usuarios.model');

    // Create a register user(ADMIN, SUPER_ADMIN, USER,AUDITOR)
    const userRegister = async (userDets, role, res) => {
  try {

    // Validate the cedula
    let cedulaNotTaken = await validateCedula(userDets.cedula);
    if (!cedulaNotTaken) {
      return res.status(400).json({
        message: `Cedula is already taken.`,
        success: false
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }

    // Get the hashed password
    const pass = await bcrypt.hash(userDets.pass, 12);
    // create a new user
    const newUser = new Usuario({
      ...userDets,
      pass,
      role
    });

    await newUser.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login.",
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

    /**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (userCreds, role, res) => {
  let { email, password} = userCreds;
  // First Check if the username is in the database
  const user = await Usuario.findOne({ email});
  if (!user) {
    return res.status(404).json({
      message: "Email is not found. Invalid login credentials.",
      success: false
    });
  }
  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false
    });
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.pass);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        cedula: user.cedula,
          nombres: user.nombres,
          apellidos:  user.apellidos,
        email: user.email,

      }
    );

    let result = {
      cedula: user.cedula,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};
    const validateCedula = async cedula => {
  let user = await Usuario.findOne({ cedula});
  return user ? false : true;
};
/**
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const validateEmail = async email => {
  let user = await Usuario.findOne({ email });
  return user ? false : true;
};

const serializeUser = usuario => {
  return {
    cedula: user.cedula,
    nombres: user.nombres,
    apellidos:  user.apellidos,
    email: user.email,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};

module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  serializeUser
};

//Create new Usuario
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Usuarios content can not be empty"
        });
    }


    // Create a Usuario
    const usuario= new Usuario({
        cedula: req.body.cedula,
        nombres: req.body.nombres || "Sin Nombre",
        apellidos: req.body.apellidos,
        email: req.body.email,
        idrol: req.body.idrol,
        rol: req.body.rol,
        pass: req.body.pass,
        materias: req.body.materias
    });

    //Save Usuario in the database
    usuario.save(
            console.log('Usuario created!')
    )
    .then(usuario => {
        res.send(usuario);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the usuario."
        });
    });
};

// Retrieve all usuarios from the database.
exports.findAll = (req, res) => {
    Usuario.find()
    .then(usuario => {
        res.send(usuario);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving usuarios."
        });
    });
};

// Find a single product with a usuario
exports.findOne = (req, res) => {
    Usuario.findOne({cedula: req.params.cedula})
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Not found with cedula " + req.params.cedula
            });            
        }
        res.send(usuario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario not found with cedula " + req.params.cedula + " Error: " + err.name
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving usuario with cedula " + req.params.cedula
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Cedula content can not be empty"
        });
    }

    // Find and update product with the request body
    Usuario.findOneAndUpdate({cedula: req.params.cedula}, {
       cedula: req.body.cedula,
        nombres: req.body.nombres || "Sin Nombre",
        apellidos: req.body.apellidos,
        email: req.body.email,
        rol: req.body.rol,
        pass: req.body.pass
    }, {new: true})
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Usuario not found with cedula " + req.params.cedula
            });
        }
        res.send(usuario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario not found with cedula " + req.params.cedula
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating usuario with cedula " + req.params.cedula
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Usuario.findOneAndRemove({cedula: req.params.cedula})
    .then(usuario => {
        if(!usuario) {
            return res.status(404).send({
                message: "Usuario not found with cedula " + req.params.cedula
            });
        }
        res.send({message: "Usuario deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Usuario not found with cedula " + req.params.cedula
            });                
        }
        return res.status(500).send({
            message: "Could not delete usuario with cedula " + req.params.cedula
        });
    });
};