const Role = require('../models/rol');
const Usuario = require('../models/usuario');



const esRolValido = async( rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol <${ rol }> no está registrado en la BD.`)
    }
};

const emailExiste = async( correo = '' ) => {
    const existeCorreo = await Usuario.findOne({ correo });
    if( existeCorreo ){
         throw new Error(`El correo <${ correo }> ya existe`)
    }
};

const existeUsuarioPorId = async( id ) => {
    const existeId = await Usuario.findById( id );
    if( !existeId ){
        throw new Error(`El ID <${ id }> no existe`)
    }
};




module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}