"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Controlador = _interopRequireDefault(require("./Controlador/Controlador"));

var _ControladorLogin = _interopRequireDefault(require("./Controlador/ControladorLogin"));

var express = require('express');

var session = require('express-session');

var cors = require('cors');

var logger = require('morgan');

var bodyParser = require('body-parser');

var app = express();
app.use(cors({
  origin: ["http://localhost:4200", "https://social-seekers-bbb14.web.app"],
  credentials: true
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
app.use(bodyParser.json({
  limit: '50mb'
})); //quitar en producción

app.use(logger('dev'));
app.use(session({
  secret: 'secret word',
  name: 'socialseekers',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: true,
    sameSite: "none"
  }
})); //The local port is 3001

var API_PORT = process.env.PORT || 3001;
app.listen(API_PORT, function () {
  console.log("LISTENING ON PORT ", API_PORT);
});
var controlador = new _Controlador["default"]();
var controladorLogin = new _ControladorLogin["default"](controlador); //var creador = new Creador(controlador);
//creador.iniciarAPI();

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
    var idMovimiento;
    var loggedIn;
    var logInPromise = controladorLogin.verificarCombinación(id, pass).then(function (res) {
      loggedIn = res.encontrado;
      req.session.idMovimiento = res.idMovimiento;
      idMovimiento = res.idMovimiento;
    })["catch"](function (err) {
      throw err;
    });
    Promise.resolve(logInPromise)["finally"](function () {
      if (loggedIn) {
        req.session.idAsesor = id;
        return res.json({
          success: true,
          movimiento: idMovimiento
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
///   CREAR
//////////////////////////////

app.post('/crear-miembro', function (req, res) {
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
      idMovimiento = _req$body2.idMovimiento,
      idZona = _req$body2.idZona,
      idRama = _req$body2.idRama,
      idGrupo = _req$body2.idGrupo;

  try {
    controlador.crearMiembroNuevo(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
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
app.post('/crear-movimiento', function (req, res) {
  var _req$body3 = req.body,
      cedulaJuridica = _req$body3.cedulaJuridica,
      nombreMovimiento = _req$body3.nombreMovimiento,
      direccionWeb = _req$body3.direccionWeb,
      logo = _req$body3.logo,
      pais = _req$body3.pais,
      provinciaMovimiento = _req$body3.provinciaMovimiento,
      cantonMovimiento = _req$body3.cantonMovimiento,
      distritoMovimiento = _req$body3.distritoMovimiento,
      telefonos = _req$body3.telefonos,
      senasMovimiento = _req$body3.senasMovimiento,
      idAsesor = _req$body3.idAsesor,
      nombre = _req$body3.nombre,
      contrasena = _req$body3.contrasena,
      celular = _req$body3.celular,
      email = _req$body3.email,
      provincia = _req$body3.provincia,
      canton = _req$body3.canton,
      distrito = _req$body3.distrito,
      senas = _req$body3.senas;

  try {
    controlador.crearAsesor(idAsesor, contrasena, nombre, email, celular, provincia, distrito, canton, senas).then(function () {
      controlador.crearMovimiento(cedulaJuridica, idAsesor, nombreMovimiento, direccionWeb, logo, pais, provinciaMovimiento, cantonMovimiento, distritoMovimiento, senasMovimiento, telefonos).then(function () {
        return res.json({
          success: true
        });
      })["catch"](function (err) {
        controlador.eliminarAsesor(idAsesor);
        return res.json({
          success: false,
          error: {
            message: err.message
          }
        });
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
      });
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/crear-zona', function (req, res) {
  var _req$body4 = req.body,
      idMovimiento = _req$body4.idMovimiento,
      nombre = _req$body4.nombre;

  try {
    controlador.crearZonaNueva(idMovimiento, nombre).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
      });
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/crear-rama', function (req, res) {
  var _req$body5 = req.body,
      idMovimiento = _req$body5.idMovimiento,
      idZona = _req$body5.idZona,
      nombre = _req$body5.nombre;

  try {
    controlador.crearRamaNueva(idMovimiento, idZona, nombre).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
      });
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/crear-grupo', function (req, res) {
  var _req$body6 = req.body,
      idMovimiento = _req$body6.idMovimiento,
      idZona = _req$body6.idZona,
      idRama = _req$body6.idRama,
      idGrupo = _req$body6.idGrupo,
      nombre = _req$body6.nombre,
      idEncargado1 = _req$body6.idEncargado1,
      idEncargado2 = _req$body6.idEncargado2,
      isMonitor = _req$body6.isMonitor;

  try {
    controlador.crearGrupoNuevo(idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isMonitor).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
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
///   MODIFY
//////////////////////////////

app.post('/modificar-asesor', function (req, res) {
  var _req$body7 = req.body,
      idMovimiento = _req$body7.idMovimiento,
      idAsesor = _req$body7.idAsesor,
      nombre = _req$body7.nombre,
      contrasena = _req$body7.contrasena,
      celular = _req$body7.celular,
      email = _req$body7.email,
      provincia = _req$body7.provincia,
      canton = _req$body7.canton,
      distrito = _req$body7.distrito,
      senas = _req$body7.senas;

  try {
    controlador.modificarAsesor(idMovimiento, idAsesor, contrasena, nombre, email, celular, provincia, distrito, canton, senas).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
      });
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/modificar-miembro', function (req, res) {
  var _req$body8 = req.body,
      idMovimiento = _req$body8.idMovimiento,
      idMiembro = _req$body8.idMiembro,
      nombre = _req$body8.nombre,
      celular = _req$body8.celular,
      email = _req$body8.email,
      provincia = _req$body8.provincia,
      canton = _req$body8.canton,
      distrito = _req$body8.distrito,
      senas = _req$body8.senas,
      posible_monitor = _req$body8.posible_monitor;

  try {
    controlador.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
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
app.post('/modificar-movimiento', function (req, res) {
  var _req$body9 = req.body,
      idMovimiento = _req$body9.idMovimiento,
      nombre = _req$body9.nombre,
      direccionWeb = _req$body9.direccionWeb,
      logo = _req$body9.logo,
      pais = _req$body9.pais,
      provincia = _req$body9.provincia,
      canton = _req$body9.canton,
      distrito = _req$body9.distrito,
      senas = _req$body9.senas,
      telefonos = _req$body9.telefonos;

  try {
    controlador.modificarMovimiento(idMovimiento, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas, telefonos).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
      });
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: {
        message: err
      }
    });
  }
});
app.post('/modificar-zona', function (req, res) {
  var _req$body10 = req.body,
      idMovimiento = _req$body10.idMovimiento,
      idZona = _req$body10.idZona,
      nombre = _req$body10.nombre,
      idJefeNuevo1 = _req$body10.idJefeNuevo1,
      idJefeNuevo2 = _req$body10.idJefeNuevo2,
      idJefeViejo1 = _req$body10.idJefeViejo1,
      idJefeViejo2 = _req$body10.idJefeViejo2;

  try {
    var promise = controlador.modificarZona(idMovimiento, idZona, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2);
    Promise.resolve(promise)["finally"](function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      throw err;
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/modificar-rama', function (req, res) {
  var _req$body11 = req.body,
      idMovimiento = _req$body11.idMovimiento,
      idZona = _req$body11.idZona,
      idRama = _req$body11.idRama,
      nombre = _req$body11.nombre,
      idJefeNuevo1 = _req$body11.idJefeNuevo1,
      idJefeNuevo2 = _req$body11.idJefeNuevo2,
      idJefeViejo1 = _req$body11.idJefeViejo1,
      idJefeViejo2 = _req$body11.idJefeViejo2;

  try {
    controlador.modificarRama(idMovimiento, idZona, idRama, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
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
app.post('/modificar-grupo', function (req, res) {
  var _req$body12 = req.body,
      idMovimiento = _req$body12.idMovimiento,
      idZona = _req$body12.idZona,
      idRama = _req$body12.idRama,
      idGrupo = _req$body12.idGrupo,
      nombre = _req$body12.nombre,
      isMonitor = _req$body12.isMonitor,
      idJefeNuevo1 = _req$body12.idJefeNuevo1,
      idJefeNuevo2 = _req$body12.idJefeNuevo2,
      idJefeViejo1 = _req$body12.idJefeViejo1,
      idJefeViejo2 = _req$body12.idJefeViejo2;

  try {
    controlador.modificarGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, isMonitor, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
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
  var _req$body13 = req.body,
      idMovimiento = _req$body13.idMovimiento,
      idZona = _req$body13.idZona;
  console.log(idZona);

  try {
    var zona = controlador.getZona(idMovimiento, idZona);
    return res.json({
      success: true,
      zona: zona,
      ramas: Object.fromEntries(zona.composites)
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
  var _req$body14 = req.body,
      idMovimiento = _req$body14.idMovimiento,
      idZona = _req$body14.idZona,
      idRama = _req$body14.idRama;

  try {
    var rama = controlador.getRama(idMovimiento, idZona, idRama);
    return res.json({
      success: true,
      rama: rama,
      grupos: Object.fromEntries(rama.composites)
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
  var _req$body15 = req.body,
      idMovimiento = _req$body15.idMovimiento,
      idZona = _req$body15.idZona,
      idRama = _req$body15.idRama,
      idGrupo = _req$body15.idGrupo;

  try {
    var grupo = controlador.getGrupo(idMovimiento, idZona, idRama, idGrupo);
    return res.json({
      success: true,
      grupo: grupo,
      miembros: Object.fromEntries(grupo.composites)
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
  var _req$body16 = req.body,
      idMovimiento = _req$body16.idMovimiento,
      idMiembro = _req$body16.idMiembro;

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

app.post('/consultar-zonas', function (req, res) {
  var idMovimiento = req.body.idMovimiento;

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
  var _req$body17 = req.body,
      idMovimiento = _req$body17.idMovimiento,
      idZona = _req$body17.idZona;

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
  var _req$body18 = req.body,
      idMovimiento = _req$body18.idMovimiento,
      idMiembro = _req$body18.idMiembro;

  try {
    controlador.consultarRamasDisponibles(idMovimiento, idMiembro).then(function (ramas) {
      return res.json({
        success: true,
        ramas: ramas
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.mesasage
        }
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
app.post('/consultar-ramas-miembro', function (req, res) {
  var _req$body19 = req.body,
      idMovimiento = _req$body19.idMovimiento,
      idMiembro = _req$body19.idMiembro;

  try {
    controlador.consultarRamasMiembro(idMovimiento, idMiembro).then(function (ramas) {
      return res.json({
        success: true,
        ramas: ramas
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
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
  var _req$body20 = req.body,
      idMovimiento = _req$body20.idMovimiento,
      idZona = _req$body20.idZona,
      idRama = _req$body20.idRama;

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
app.post('/consultar-grupo-miembro-en-rama', function (req, res) {
  var _req$body21 = req.body,
      idMovimiento = _req$body21.idMovimiento,
      idZona = _req$body21.idZona,
      idRama = _req$body21.idRama,
      idMiembro = _req$body21.idMiembro;

  try {
    controlador.consultarGrupoDeMiembroEnRama(idMovimiento, idZona, idRama, idMiembro).then(function (grupo) {
      return res.json({
        success: true,
        grupo: grupo
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          mesasage: err.message
        }
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
app.post('/consultar-miembros-grupo', function (req, res) {
  var _req$body22 = req.body,
      idMovimiento = _req$body22.idMovimiento,
      idZona = _req$body22.idZona,
      idRama = _req$body22.idRama,
      idGrupo = _req$body22.idGrupo;

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
app.post('/consultar-miembros-rama', function (req, res) {
  var _req$body23 = req.body,
      idMovimiento = _req$body23.idMovimiento,
      idZona = _req$body23.idZona,
      idRama = _req$body23.idRama;

  try {
    var miembros = controlador.consultarMiembrosRama(idMovimiento, idZona, idRama);
    return res.json({
      success: true,
      miembros: miembros
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/consultar-miembros-zona', function (req, res) {
  var _req$body24 = req.body,
      idMovimiento = _req$body24.idMovimiento,
      idZona = _req$body24.idZona;

  try {
    var miembros = controlador.consultarMiembrosZona(idMovimiento, idZona);
    return res.json({
      success: true,
      miembros: miembros
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err
    });
  }
});
app.post('/consultar-monitores-probables', function (req, res) {
  var _req$body25 = req.body,
      idMovimiento = _req$body25.idMovimiento,
      idZona = _req$body25.idZona,
      idRama = _req$body25.idRama,
      idGrupo = _req$body25.idGrupo;

  try {
    controlador.consultarMonitoresProbables(idMovimiento, idZona, idRama, idGrupo).then(function (monitores) {
      return res.json({
        success: true,
        monitores: monitores
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
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
app.post('/consultar-monitores-zona', function (req, res) {
  var _req$body26 = req.body,
      idMovimiento = _req$body26.idMovimiento,
      idZona = _req$body26.idZona;

  try {
    controlador.consultarMonitoresZona(idMovimiento, idZona).then(function (monitores) {
      return res.jsonp({
        success: true,
        monitores: monitores
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
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
///   EXTRA
//////////////////////////////

app.post('/agregar-miembro-grupo', function (req, res) {
  var _req$body27 = req.body,
      idMovimiento = _req$body27.idMovimiento,
      idZona = _req$body27.idZona,
      idRama = _req$body27.idRama,
      idGrupo = _req$body27.idGrupo,
      idMiembro = _req$body27.idMiembro;

  try {
    controlador.agregarMiembroNuevoAGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro).then(function () {
      res.json({
        success: true
      });
    })["catch"](function (err) {
      res.json({
        success: false,
        error: {
          message: err.message
        }
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
app.post('/cambio-de-grupo', function (req, res) {
  var _req$body28 = req.body,
      idMovimiento = _req$body28.idMovimiento,
      idZona = _req$body28.idZona,
      idRama = _req$body28.idRama,
      idGrupoViejo = _req$body28.idGrupoViejo,
      idGrupoNuevo = _req$body28.idGrupoNuevo,
      idMiembro = _req$body28.idMiembro;

  try {
    controlador.cambioDeGrupo(idMovimiento, idZona, idRama, idGrupoNuevo, idGrupoViejo, idMiembro).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
      });
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      error: err.mesasage
    });
  }
});
app.post('/asignar-encargado-grupo', function (req, res) {
  var _req$body29 = req.body,
      idMovimiento = _req$body29.idMovimiento,
      idZona = _req$body29.idZona,
      idRama = _req$body29.idRama,
      idGrupo = _req$body29.idGrupo,
      idMiembro = _req$body29.idMiembro,
      idMiembro2 = _req$body29.idMiembro2,
      isMonitor = _req$body29.isMonitor;

  try {
    controlador.asignarEncargadoGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro, idMiembro2, isMonitor);
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
app.post('/asignar-encargado-rama', function (req, res) {
  var _req$body30 = req.body,
      idMovimiento = _req$body30.idMovimiento,
      idZona = _req$body30.idZona,
      idRama = _req$body30.idRama,
      idMiembro = _req$body30.idMiembro,
      idMiembro2 = _req$body30.idMiembro2,
      isMonitor = _req$body30.isMonitor;

  try {
    controlador.asignarEncargadoRama(idMovimiento, idZona, idRama, idMiembro, idMiembro2, idMiembro2, isMonitor);
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
app.post('/asignar-encargado-zona', function (req, res) {
  var _req$body31 = req.body,
      idMovimiento = _req$body31.idMovimiento,
      idZona = _req$body31.idZona,
      idMiembro = _req$body31.idMiembro,
      idMiembro2 = _req$body31.idMiembro2,
      isMonitor = _req$body31.isMonitor;

  try {
    controlador.asignarEncargadoZona(idMovimiento, idZona, idMiembro, idMiembro2, idMiembro2, isMonitor);
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
app.post('/iniciar-estructura-movimiento', function (req, res) {
  var _req$body32 = req.body,
      idMovimiento = _req$body32.idMovimiento,
      nombreZona = _req$body32.nombreZona,
      nombreRama = _req$body32.nombreRama,
      idGrupo = _req$body32.idGrupo,
      nombreGrupo = _req$body32.nombreGrupo,
      idMiembro = _req$body32.idMiembro,
      idMiembro2 = _req$body32.idMiembro2,
      nombreMiembro = _req$body32.nombreMiembro,
      celular = _req$body32.celular,
      email = _req$body32.email,
      provincia = _req$body32.provincia,
      canton = _req$body32.canton,
      distrito = _req$body32.distrito,
      senas = _req$body32.senas,
      posible_monitor = _req$body32.posible_monitor;

  try {
    controlador.crearEstructuraBase(idMovimiento, nombreZona, nombreRama, idGrupo, nombreGrupo, idMiembro, idMiembro2, nombreMiembro, celular, email, provincia, canton, distrito, senas, posible_monitor).then(function () {
      return res.json({
        success: true
      });
    })["catch"](function (err) {
      return res.json({
        success: false,
        error: {
          message: err.message
        }
      });
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err
    });
  }
});