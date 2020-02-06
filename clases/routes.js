
module.exports = (app) => {
    const aulas = require('./aulas.controller');

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


}