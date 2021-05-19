const bcryptjs = require("bcryptjs");
const { response } = require('express');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");



const login = async( req, res = response ) => {

    const { correo, password } = req.body;

    try {
        // verificar si correo existe
        const usuario = await Usuario.findOne( { correo } );
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            })
        }
        // usuario activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            })
        }
        // verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            })
        }
        // generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }
}





module.exports = {
    login
}