module.exports = (app) => {
    const aulas = require('./aulas.controller');
    const clases = require('./clases.controller.js');
    //ROUTES AULAS
    // Create a new Materia
    app.post('/aulas', aulas.create);

    // Retrieve all Materias
    app.get('/aulas', aulas.findAll);

    // Retrieve a single Materia with idmateria
    app.get('/aulas/:id', aulas.findOne);

    // Update a Materia with idmateria
    app.get('/aulas/update/:id', aulas.update);

    // Delete a Materia with idmateria
    app.get('/aulas/delete/:id', aulas.delete);


    // Create a new Clase
    app.post('/class', clases.create);

    // Retrieve all Materias
    app.get('/class', clases.findAll);

    // Retrieve a single Materia with idmateria
    app.get('/class/:id', clases.findOne);

    // Update a Materia with idmateria
    app.put('/class/update/:id', clases.update);

    // Delete a Materia with idmateria
    app.delete('/class/delete/:id', clases.delete);


}