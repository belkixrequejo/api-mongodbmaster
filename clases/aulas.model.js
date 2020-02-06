const mongoose = require('mongoose');

const HaulasSchema = mongoose.Schema({
    id:      String ,
    nombre:    String
    }, {
    timestamps: true
});

module.exports = mongoose.model('HAulas', HaulasSchema);