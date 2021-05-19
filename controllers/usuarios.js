const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');



const usuariosGet = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const lim = parseInt(limite);
    const des = parseInt(desde);
    // let usuarios = ''
    // let total = 0
    let resp = ''
    if(  lim >= 0 && des >= 0 ){
        // usuarios = await Usuario.find({ estado: true })
        //     .skip( des )
        //     .limit( lim );
        // total = await Usuario.countDocuments({ estado: true })

        resp = await Promise.all([
            Usuario.countDocuments({ estado: true }),
            Usuario.find({ estado: true })
                .skip( des )
                .limit( lim )
        ])

    } else {
        return res.status(400).json({
            msg: 'Paginado con parámetros incorrectos'
        })
    }

    const [ total, usuarios ] = resp;

    res.json({
        // resp
        total,
        usuarios
    })
};

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync( password, salt );

    // Guardar en DB
    await usuario.save();

    res.status(201).json( usuario );
};

const usuariosPut = async(req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if( password ){
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, { new: true })

    res.json(usuario);
}

const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'patch API - controlador'
    })
};

const usuariosDelete = async(req, res = response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( usuario );

};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}