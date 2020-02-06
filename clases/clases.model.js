const mongoose = require('mongoose');
const HAulas = require('./aulas.model.js');

const haulas = new HAulas();
const HclasesSchema = mongoose.Schema({
    idmateria:      String ,
    aulas:          haulas ,
    dia:            String ,
    horainicio:     Date   ,
    horafinal:      Date   ,
    docente:        String ,
    materia:        String ,
    nivel:          String ,
    carrera:        String
    }, {
    timestamps: true
});

module.exports = mongoose.model('Hclases', HclasesSchema);