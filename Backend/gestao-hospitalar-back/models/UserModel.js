var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserSchema = new Schema({
    'nome': String,
    'sobrenome': String,
    'email': String,
    'cidade': String,
    'estado': String,
    'telefone': String,
})

module.exports = mongoose.model('User', UserSchema);