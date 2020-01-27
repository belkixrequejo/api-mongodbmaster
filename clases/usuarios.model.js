const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    cedula:     String ,
    nombres:    String ,
    apellidos:  String ,
    email:      String ,
    idrol:      String ,
    rol:        String ,
    materias:   Array  ,
    pass:       String
    }, {
    timestamps: true
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);