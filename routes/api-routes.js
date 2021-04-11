"use strict";

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const validReqMiddleware = require("../middleware/validate-request-middleware");
const { CrudController } = require("../controllers/crud-controller");
const { body, query } = require("express-validator");


/*************************************
 *
 * * Rutas referentes a ESCUELAS
 *
 */
const crudEscuelas = new CrudController("Escuela", "escuela");
router.post(
  "/escuelas/crear",
  [
    authMiddleware,
    [body("escuela").isAlphanumeric().not().isEmpty().trim()],
    validReqMiddleware({
      modulo: "Escuelas",
      submodulo: "Listado de escuelas",
      accion: "C",
    }),
  ],
  crudEscuelas.create.bind(crudEscuelas)
);
router.get(
  "/escuelas/listar",
  [
    authMiddleware,
    [
      [
        query("pagina").not().isEmpty().isInt(),
        query("resultados_por_pagina").not().isEmpty().isInt(),
        query("escuela").trim(),
      ],
    ]
  ],
  crudEscuelas.read.bind(crudEscuelas)
);
router.patch(
  "/escuelas/actualizar",
  [
    authMiddleware,
    [body("id").not().isEmpty().isInt(), body("escuela").not().isEmpty().trim()],
    validReqMiddleware({
      modulo: "Escuelas",
      submodulo: "Listado de escuelas",
      accion: "U",
    }),
  ],
  crudEscuelas.update.bind(crudEscuelas)
);
router.delete(
  "/escuelas/eliminar",
  [
    authMiddleware,
    [body("id").not().isEmpty().isInt()],
    validReqMiddleware({
      modulo: "Escuelas",
      submodulo: "Listado de escuelas",
      accion: "D",
    }),
  ],
  crudEscuelas.delete.bind(crudEscuelas)
);

/*************************************
 *
 * * Rutas referentes a DIAS INHABILES
 *  
 * Aqui no se actualizarán registros. Solo se listarán, crearán y borrarán.
 */
const crudDiasInhabiles = new CrudController("DiasInhabiles", "dia");
router.post(
  "/dias_inhabiles/crear",
  [
    authMiddleware,
    [body("dia").not().isEmpty().isInt(), body("activo").not().isEmpty().isInt().isIn([1])],
    validReqMiddleware(null, "Admin"),
  ],
  crudDiasInhabiles.create.bind(crudDiasInhabiles)
);
router.get(
  "/dias_inhabiles/listar",
  [
    authMiddleware,
    [
      [
        query("pagina").not().isEmpty().isInt(),
        query("resultados_por_pagina").not().isEmpty().isInt()
      ],
    ],
    validReqMiddleware(null, "Admin")
  ],
  crudDiasInhabiles.read.bind(crudDiasInhabiles)
);
router.delete(
  "/dias_inhabiles/eliminar",
  [
    authMiddleware,
    [body("id").not().isEmpty().isInt()],
    validReqMiddleware(null, "Admin")
  ],
  crudDiasInhabiles.delete.bind(crudDiasInhabiles)
);


const usuario = require("../controllers/user-controller");

router.post("/signup", usuario.validacionSignUp, usuario.signUp);
router.post("/login", usuario.validacionLogIn, usuario.logIn);
router.post(
  "/usuarios/cambiar_contrasena",
  [authMiddleware, usuario.validacionCambiarContrasena],
  usuario.cambiarContrasena
);

/*************************************
 *
 * * Rutas referentes a PROGRAMAS
 *
 */
const programas = require("../controllers/programs-controller");
router.post("/programas/crear", [authMiddleware, programas.validacionCrearPrograma], programas.crearPrograma);
router.delete(
  "/programas/eliminar",
  [authMiddleware, programas.validacionEliminarPrograma],
  programas.eliminarPrograma
);
router.patch(
  "/programas/actualizar",
  [authMiddleware, programas.validacionActualizarPrograma],
  programas.actualizarPrograma
);
router.get("/programas/listar", [programas.validacionListarProgramas], programas.listarProgramas);

/*************************************
 *
 * * Rutas referentes a INSTITUTOS
 *
 */
const institutos = require("../controllers/campus-controller");
router.post("/institutos/crear", [authMiddleware, institutos.validacionCrearInstituto], institutos.crearInstituto);
router.delete(
  "/institutos/eliminar",
  [authMiddleware, institutos.validacionEliminarInstituto],
  institutos.eliminarInstituto
);
router.patch(
  "/institutos/actualizar",
  [authMiddleware, institutos.validacionActualizarInstituto],
  institutos.actualizarInstituto
);
router.get("/institutos/listar", [institutos.validacionListarInstitutos], institutos.listarInstitutos);

/*************************************
 *
 * * Rutas referentes a Ventanillas
 *
 */
const ventanillas = require("../controllers/ventanilla-controller");
router.post(
  "/ventanillas/crear",
  [
    authMiddleware,
    ventanillas.validacionListarVentanilla,
    validReqMiddleware({
      modulo: "Ventanillas",
      submodulo: "Listado de ventanillas",
      accion: "C",
    }),
  ],
  ventanillas.crearVentanilla
);

router.get(
  "/ventanillas/listar",
  [
    authMiddleware,
    ventanillas.validacionListarVentanilla,
    validReqMiddleware({
      modulo: "Ventanillas",
      submodulo: "Listado de ventanillas",
      accion: "R",
    }),
  ],
  ventanillas.listarVentanilla
);

router.patch(
  "/ventanillas/actualizar",
  [
    authMiddleware,
    ventanillas.validacionListarVentanilla,
    validReqMiddleware({
      modulo: "Ventanillas",
      submodulo: "Listado de ventanillas",
      accion: "U",
    }),
  ],
  ventanillas.actualizarVentanilla
);

router.delete(
  "/ventanillas/eliminar",
  [
    authMiddleware,
    ventanillas.validacionListarVentanilla,
    validReqMiddleware({
      modulo: "Ventanillas",
      submodulo: "Listado de ventanillas",
      accion: "D",
    }),
  ],
  ventanillas.borrarVentanilla
);

module.exports = router;
