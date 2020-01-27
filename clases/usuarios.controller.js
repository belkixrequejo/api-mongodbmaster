const Usuario =  require('./usuarios.model');
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
        idrol: req.body.idrol,
        rol: req.body.rol,
        pass: req.body.pass,
        materias: req.body.materias
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