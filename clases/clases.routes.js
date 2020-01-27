module.exports = (app) => {
    const clases = require('./clases.controller.js');
    const usuarios = require('./usuarios.controller.js');

    // Create a new Materia
    app.post('/class', clases.create);

    // Retrieve all Materias
    app.get('/class', clases.findAll);

    // Retrieve a single Materia with idmateria
    app.get('/class/:idmateria', clases.findOne);

    // Update a Materia with idmateria
    app.put('/class/update/:idmateria', clases.update);

    // Delete a Materia with idmateria
    app.delete('/class/delete/:idmateria', clases.delete);


    // Create a new Usuarios
    app.post('/usuarios', usuarios.create);

    // Retrieve all Usuarios
    app.get('/usuarios', usuarios.findAll);

    // Retrieve a single Usuarios with cedula
    app.get('/usuarios/:cedula', usuarios.findOne);

    // Update a Usuarios with cedula
    app.put('/usuarios/update/:cedula', usuarios.update);

    // Delete a Usuarios with cedula
    app.delete('/usuarios/delete/:cedula', usuarios.delete);
}