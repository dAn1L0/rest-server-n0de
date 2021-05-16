const { Schema, model } = require('mongoose');

/*
{
    ...
    rol: 'ADMIN_ROLE',
    ...
}*/

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },

});

module.exports = model('Role', RoleSchema );