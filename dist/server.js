"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Controlador = _interopRequireDefault(require("./Controlador/Controlador"));

var _ControladorLogin = _interopRequireDefault(require("./Controlador/ControladorLogin"));

var _DAO = _interopRequireDefault(require("./Controlador/DAO"));

var express = require('express');

var session = require('express-session');

var cors = require('cors');

var logger = require('morgan');

var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //quitar en producción

app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
})); //The local port is 3001

var API_PORT = process.env.PORT || 3001;
app.listen(API_PORT, function () {
  console.log("LISTENING ON PORT ", API_PORT);
});
var controlador = new _Controlador["default"]();
var controladorLogin = new _ControladorLogin["default"](controlador);
var dao = new _DAO["default"](); //var creador = new Creador(controlador);

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
      console.log(res);
      loggedIn = res.encontrado;
      req.session.idMovimiento = res.idMovimiento;
    })["catch"](function (err) {
      throw err;
    });
    Promise.resolve(logInPromise)["finally"](function () {
      if (loggedIn) {
        req.session.idAsesor = id;
        console.log(req.session.idAsesor + "||||||||||||||||||||||||||||||");
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
    controlador.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, '4000042145', idZona, idRama, idGrupo);
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
app.post('/modificar-movimiento', function (req, res) {
  var _req$body7 = req.body,
      idMovimiento = _req$body7.idMovimiento,
      idAsesor = _req$body7.idAsesor,
      nombre = _req$body7.nombre,
      direccionWeb = _req$body7.direccionWeb,
      logo = _req$body7.logo,
      pais = _req$body7.pais,
      provincia = _req$body7.provincia,
      canton = _req$body7.canton,
      distrito = _req$body7.distrito,
      senas = _req$body7.senas;

  try {
    controlador.modificarMovimiento(idMovimiento, idAsesor, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas);
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

app.post('/get-movimiento', function (req, res) {
  var idMovimiento = req.body.idMovimiento;

  try {
    var movimiento = controlador.getMovimiento(idMovimiento);
    return res.json({
      success: true,
      movimiento: movimiento
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: true,
      error: err
    });
  }
});
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
  var _req$body8 = req.body,
      idZona = _req$body8.idZona,
      idRama = _req$body8.idRama;

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
  var _req$body9 = req.body,
      idZona = _req$body9.idZona,
      idRama = _req$body9.idRama,
      idGrupo = _req$body9.idGrupo;

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
    var grupos;
    var gruposPromise = controlador.getGruposMiembro(idMovimiento, idMiembro).then(function (res) {
      grupos = res;
    });
    Promise.resolve(gruposPromise)["finally"](function () {
      return res.json({
        success: true,
        miembro: miembro,
        grupos: grupos
      });
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
app.post('/consultar-ramas-disponibles', function (req, res) {
  var idMiembro = req.body.idMiembro;

  try {
    var ramas;
    var ramasPromise = controlador.consultarRamasDisponibles(idMovimiento, idMiembro).then(function (res) {
      ramas = res;
    })["catch"](function (err) {
      throw err;
    });
    Promise.resolve(ramasPromise)["finally"](function () {
      return res.json({
        success: true,
        ramas: Object.fromEntries(ramas)
      });
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
  var _req$body10 = req.body,
      idZona = _req$body10.idZona,
      idRama = _req$body10.idRama;

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
  var _req$body11 = req.body,
      idZona = _req$body11.idZona,
      idRama = _req$body11.idRama,
      idGrupo = _req$body11.idGrupo; //var idMiembro = "123";

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
}); //////////////////////////////
///   EXTRA
//////////////////////////////

app.post('/agregar-miembro-grupo', function (req, res) {
  var _req$body12 = req.body,
      idZona = _req$body12.idZona,
      idRama = _req$body12.idRama,
      idGrupo = _req$body12.idGrupo,
      idMiembro = _req$body12.idMiembro;

  try {
    controlador.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro);
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
app.post('/asignar-jefe-grupo', function (req, res) {
  var _req$body13 = req.body,
      idZona = _req$body13.idZona,
      idRama = _req$body13.idRama,
      idGrupo = _req$body13.idGrupo,
      idMiembro = _req$body13.idMiembro,
      idMiembro2 = _req$body13.idMiembro2;

  try {
    controlador.asignarJefeGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro, idMiembro2);
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
app.post('/asignar-jefe-rama', function (req, res) {
  var _req$body14 = req.body,
      idZona = _req$body14.idZona,
      idRama = _req$body14.idRama,
      idMiembro = _req$body14.idMiembro,
      idMiembro2 = _req$body14.idMiembro2;

  try {
    controlador.asignarJefeRama(idMovimiento, idZona, idRama, idMiembro, idMiembro2, idMiembro2);
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
app.post('/asignar-jefe-zona', function (req, res) {
  var _req$body15 = req.body,
      idZona = _req$body15.idZona,
      idRama = _req$body15.idRama,
      idMiembro = _req$body15.idMiembro,
      idMiembro2 = _req$body15.idMiembro2;

  try {
    controlador.asignarJefeRama(idMovimiento, idZona, idRama, idMiembro, idMiembro2, idMiembro2);
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
app.get('/showSession', function (req, res) {
  res.send(req.session);
  res.end(); //return res.json({success: true, session: session.userName})
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