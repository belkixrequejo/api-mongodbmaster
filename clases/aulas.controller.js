const Haulas = require('./aulas.model.js');


//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Clases content can not be empty"
        });
    }

    // Create a Aulas
    const haulas = new Haulas({
        id: req.body.id,
        nombre: req.body.nombre
    });

    // Save Aulas in the database
    haulas.save(
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
// Retrieve all Aulas from the database.
exports.findAll = (req, res) => {
    Haulas.find()
    .then(haulas => {
        res.send(haulas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving clases."
        });
    });
};
// Find a single Aulas with a Id
exports.findOne = (req, res) => {
    Haulas.findOne({id: req.params.id})
    .then(haulas => {
        if(!haulas) {
            return res.status(404).send({
                message: "Not found with id " + req.params.id
            });
        }
        res.send(haulas);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Clases not found with id " + req.params.id + " Error: " + err.name
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving clases with idMateria " + req.params.id
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "id content can not be empty"
        });
    }

    // Find and update product with the request body
    Haulas.findOneAndUpdate({id: req.params.id}, {
        id: req.body.id,
        nombre: req.body.nombre
    }, {new: true})
    .then(haulas => {
        if(!haulas) {
            return res.status(404).send({
                message: "Aulas not found with id " + req.params.id
            });
        }
        res.send(haulas);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aulas not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating Aulas with id " + req.params.id
        });
    });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Haulas.findOneAndRemove({id: req.params.id})
    .then(haulas => {
        if(!haulas) {
            return res.status(404).send({
                message: "Aulas not found with id " + req.params.id
            });
        }
        res.send({message: "Aulas deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aulas not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete materia with id " + req.params.id
        });
    });
};