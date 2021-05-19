const { Schema, model } = require('mongoose');

/*
{
    nombre: 'danilo',
    email: 'danilo@gmail.es',
    password: '0123456789' // TODO: encriptar
    img:  'https://user-img-avatar',
    rol: 'digitador',
    estado: false, // activo o inactivo
    google: false, // vía de registro
}*/

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        default: null
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

UsuarioSchema.methods.toJSON = function () {
    const { __v, _id, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario', UsuarioSchema );

