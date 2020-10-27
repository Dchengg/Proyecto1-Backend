"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Controlador = _interopRequireDefault(require("./Controlador/Controlador"));

var _ControladorLogin = _interopRequireDefault(require("./Controlador/ControladorLogin"));

var express = require('express');

var cors = require('cors');

var logger = require('morgan');

var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //quitar en producción

app.use(logger('dev')); //The local port is 3001

var API_PORT = process.env.PORT || 3001;
app.listen(API_PORT, function () {
  console.log("LISTENING ON PORT ", API_PORT);
});
var controlador = new _Controlador["default"]();
var controladorLogin = new _ControladorLogin["default"](controlador); //var creador = new Creador(controlador);

var idMovimiento = '4000042145'; //creador.iniciarAPI();

app.get('/', function (req, res) {
  return res.json({
    success: true,
    message: "You just connected to the social seekers API, welcome :D"
  });
});
app.post('/iniciar-sesion', function (req, res) {
  var _req$body = req.body,
      id = _req$body.id,
      pass = _req$body.pass;

  try {
    var loggedIn;
    var logInPromise = controladorLogin.verificarCombinación(id, pass).then(function (res) {
      loggedIn = res;
    })["catch"](function (err) {
      throw err;
    });
    Promise.resolve(logInPromise)["finally"](function () {
      if (loggedIn) {
        return res.json({
          success: true
        });
      }

      return res.json({
        success: false
      });
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
}); //////////////////////////////
///   CREATIONS
//////////////////////////////

app.get('/crear-miembro', function (req, res) {
  var _req$body2 = req.body,
      idMiembro = _req$body2.idMiembro,
      nombre = _req$body2.nombre,
      celular = _req$body2.celular,
      email = _req$body2.email,
      provincia = _req$body2.provincia,
      canton = _req$body2.canton,
      distrito = _req$body2.distrito,
      senas = _req$body2.senas,
      posible_monitor = _req$body2.posible_monitor,
      idZona = _req$body2.idZona,
      idRama = _req$body2.idRama,
      idGrupo = _req$body2.idGrupo;

  try {
    controlador.crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, idMovimiento, idZona, idRama, idGrupo);
    return res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/crear-zona', function (req, res) {
  var _req$body3 = req.body,
      idZona = _req$body3.idZona,
      nombre = _req$body3.nombre;

  try {
    controlador.crearZona(idMovimiento, idZona, nombre);
    return res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/crear-rama', function (req, res) {
  var _req$body4 = req.body,
      idZona = _req$body4.idZona,
      idRama = _req$body4.idRama,
      nombre = _req$body4.nombre;

  try {
    controlador.crearRama(idMovimiento, idZona, idRama, nombre);
    return res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/crear-grupo', function (req, res) {
  var _req$body5 = req.body,
      idMovimiento = _req$body5.idMovimiento,
      idZona = _req$body5.idZona,
      idRama = _req$body5.idRama,
      idGrupo = _req$body5.idGrupo,
      nombre = _req$body5.nombre,
      idEncargado1 = _req$body5.idEncargado1,
      idEncargado2 = _req$body5.idEncargado2;

  try {
    controlador.crearGrupo(idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2);
    return res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
}); //////////////////////////////
///   MODIFY
//////////////////////////////

app.post('/modificar-miembro', function (req, res) {
  var _req$body6 = req.body,
      idMiembro = _req$body6.idMiembro,
      nombre = _req$body6.nombre,
      celular = _req$body6.celular,
      email = _req$body6.email,
      provincia = _req$body6.provincia,
      canton = _req$body6.canton,
      distrito = _req$body6.distrito,
      senas = _req$body6.senas,
      posible_monitor = _req$body6.posible_monitor,
      idZona = _req$body6.idZona,
      idRama = _req$body6.idRama,
      idGrupo = _req$body6.idGrupo;

  try {
    controlador.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo);
    return res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
}); //////////////////////////////
///   GETTERS
///   Returns a single value
//////////////////////////////

app.post('/get-zona', function (req, res) {
  var idZona = req.body.idZona;
  console.log(idZona);

  try {
    var zona = controlador.getZona(idMovimiento, idZona);
    return res.json({
      success: true,
      zona: zona,
      hijos: Object.fromEntries(zona.composites)
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/get-rama', function (req, res) {
  var _req$body7 = req.body,
      idZona = _req$body7.idZona,
      idRama = _req$body7.idRama;

  try {
    var rama = controlador.getRama(idMovimiento, idZona, idRama);
    return res.json({
      success: true,
      rama: rama,
      hijos: Object.fromEntries(rama.composites)
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/get-grupo', function (req, res) {
  var _req$body8 = req.body,
      idZona = _req$body8.idZona,
      idRama = _req$body8.idRama,
      idGrupo = _req$body8.idGrupo;

  try {
    var grupo = controlador.getGrupo(idMovimiento, idZona, idRama, idGrupo);
    return res.json({
      success: true,
      grupo: grupo,
      hijos: Object.fromEntries(grupo.composites)
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/get-miembro', function (req, res) {
  var idMiembro = req.body.idMiembro;

  try {
    var miembro = controlador.getMiembro(idMovimiento, idMiembro);
    return res.json({
      success: true,
      miembro: miembro
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
}); //////////////////////////////
///   CONSULTS
///   Returns an array of values
//////////////////////////////

app.get('/consultar-zonas', function (req, res) {
  try {
    var zonas = controlador.consultarZonas(idMovimiento);
    return res.json({
      success: true,
      zonas: Object.fromEntries(zonas)
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/consultar-ramas', function (req, res) {
  var idZona = req.body.idZona;

  try {
    var ramas = controlador.consultarRamas(idMovimiento, idZona);
    return res.json({
      success: true,
      ramas: Object.fromEntries(ramas)
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/consultar-grupos', function (req, res) {
  var _req$body9 = req.body,
      idZona = _req$body9.idZona,
      idRama = _req$body9.idRama;

  try {
    var grupos = controlador.consultarGrupos(idMovimiento, idZona, idRama);
    return res.json({
      success: true,
      grupos: Object.fromEntries(grupos)
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/consultar-miembros-grupo', function (req, res) {
  var _req$body10 = req.body,
      idZona = _req$body10.idZona,
      idRama = _req$body10.idRama,
      idGrupo = _req$body10.idGrupo; //var idMiembro = "123";

  try {
    var miembros = controlador.consultarMiembrosGrupo(idMovimiento, idZona, idRama, idGrupo);
    return res.json({
      success: true,
      miembros: Object.fromEntries(miembros)
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
/*
var idZona = "1";
var idRama = "1";
var idGrupo = "1";
controlador.crearZona(idZona, "Caribe");
controlador.crearRama(idZona, idRama, "Juvenil");
controlador.crearGrupo(idZona, idRama, idGrupo, "SCOUTS");
var idMiembro = "123";
var nombre = "Diego";
var celular = "12324";
var email = "email";
var provincia = "San José";
var canton = "Santa Ana";
var distrito = "brasil";
controlador.crearMiembro(idMiembro, nombre, celular, email, provincia, canton,distrito, "", "", idZona, idRama, idGrupo);

controlador.crearGrupo(idZona, idRama, "2", "here","123");*/