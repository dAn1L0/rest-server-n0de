const { Router } = require('express');
const {check} = require("express-validator");


const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

const {esRolValido, emailExiste, existeUsuarioPorId} = require("../helpers/db-validators");

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put(
    '/:id',
    [
        // check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('id', 'ID no válido').custom( existeUsuarioPorId ).isMongoId(),
        check('rol').custom( esRolValido ),
        validarCampos
    ],
    usuariosPut
);

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('correo', 'El correo no es válido.').custom( emailExiste ).isEmail(),
        check('password', 'La contraseña debe contener más de 6 caracteres.').isLength({
            min: 6
        }),
        check('rol').custom( esRolValido ),
        validarCampos
    ],
    usuariosPost
);

router.delete(
    '/:id',
    [
        validarJWT,
        esAdminRole,
        tieneRole('ADMIN_ROLE'),
        check('id', 'ID no válido').custom( existeUsuarioPorId ).isMongoId(),
        validarCampos
    ],
    usuariosDelete
);

router.patch('/', usuariosPatch );




module.exports = router;