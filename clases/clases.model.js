const mongoose = require('mongoose');
const HAulas = require('./aulas.model.js');
const HclasesSchema = mongoose.Schema({
    id:             String ,
    aulas:          String ,
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