const Hclases = require('./clases.model.js');


//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Clases content can not be empty"
        });
    }

    // Create a Class
    const hclases = new Hclases({
        id: req.body.id,
        aulas: req.body.aulas,
        dia: req.body.dia,
        horainicio: req.body.horainicio,
       horafinal: req.body.horafinal,
        docente: req.body.docente,
        materia: req.body.materia,
        nivel: req.body.nivel,
        carrera: req.body.carrera
    });

    // Save Product in the database
    hclases.save(
            console.log('Class created!')
    )
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the clases."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Hclases.find()
    .then(hclases => {
        res.send(hclases);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving clases."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Hclases.findOne({id: req.params.id})
    .then(hclases => {
        if(!hclases) {
            return res.status(404).send({
                message: "Not found with idMateria " + req.params.id
            });            
        }
        res.send(hclases);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Clases not found with idMateria " + req.params.id + " Error: " + err.name
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving clases with idMateria " + req.params.idmateria
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "idMateria content can not be empty"
        });
    }

    // Find and update product with the request body
    Hclases.findOneAndUpdate({id: req.params.id}, {
        id: req.body.id,
        aulas: req.body.aulas,
        dia: req.body.dia,
        horainicio: req.body.horainicio,
        horafinal: req.body.horafinal,
        docente: req.body.docente,
        materia: req.body.materia,
        nivel: req.body.nivel,
        carrera: req.body.carrera
    }, {new: true})
    .then(hclases => {
        if(!hclases) {
            return res.status(404).send({
                message: "Materia not found with idMateria " + req.params.id
            });
        }
        res.send(hclases);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Materia not found with idMateria " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating materia with idMateria " + req.params.id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Hclases.findOneAndRemove({id: req.params.id})
    .then(hclases => {
        if(!hclases) {
            return res.status(404).send({
                message: "Materia not found with id " + req.params.id
            });
        }
        res.send({message: "Materia deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Materia not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete materia with id " + req.params.id
        });
    });
};
