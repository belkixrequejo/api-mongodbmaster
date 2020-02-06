const mongoose = require('mongoose');
const HAulas = require('./aulas.model.js');
const Husr = require('./usuarios.model');

const haulas = new HAulas();
const HclasesSchema = mongoose.Schema({
    id:      String ,
    aulas:          haulas ,
    dia:            String ,
    horainicio:     Date   ,
    horafinal:      Date   ,
    docente:        String ,
    materia:        String ,
    docente:        String ,
    nivel:          String ,
    carrera:        String
    }, {
    timestamps: true
});

module.exports = mongoose.model('Hclases', HclasesSchema);