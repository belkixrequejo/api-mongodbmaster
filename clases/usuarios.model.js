const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    cedula: {
      type: String,
      required: true
    },
    nombres: {
      type: String,
      required: true
    },
    apellidos: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    nombres: {
      type: String,
      required: true
    },
    nombres: {
      type: String,
      required: true
    },
    rol: {
      type: String,
      default: "user",
      enum: [ "user", "auditorio","admin","superadmin"]
    },
    pass: {
      type: String,
      required: true
    }
    }, {
    timestamps: true
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);