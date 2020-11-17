"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Controlador = _interopRequireDefault(require("./Controlador/Controlador"));

var _ControladorLogin = _interopRequireDefault(require("./Controlador/ControladorLogin"));

var express = require('express');

var session = require('express-session');

var cors = require('cors');

var logger = require('morgan');

var bodyParser = require('body-parser');

var _require = require('should-send-same-site-none'),
    shouldSendSameSiteNone = _require.shouldSendSameSiteNone;

var app = express();
app.use(cors({
  origin: ["http://localhost:4200", "https://social-seekers-bbb14.web.app"],
  credentials: true
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //quitar en producción

app.use(logger('dev'));
app.use(shouldSendSameSiteNone); //app.set('trust proxy', 1);

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
      loggedIn = res.encontrado;
      req.session.idMovimiento = res.idMovimiento;
    })["catch"](function (err) {
      throw err;
    });
    Promise.resolve(logInPromise)["finally"](function () {
      if (loggedIn) {
        req.session.idAsesor = id;
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
  var nombre = req.body.nombre;

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
  var _req$body4 = req.body,
      idZona = _req$body4.idZona,
      nombre = _req$body4.nombre;

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
  var _req$body5 = req.body,
      idZona = _req$body5.idZona,
      idRama = _req$body5.idRama,
      idGrupo = _req$body5.idGrupo,
      nombre = _req$body5.nombre,
      idEncargado1 = _req$body5.idEncargado1,
      idEncargado2 = _req$body5.idEncargado2,
      isMonitor = _req$body5.isMonitor;

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
  var _req$body6 = req.body,
      idAsesor = _req$body6.idAsesor,
      nombre = _req$body6.nombre,
      contrasena = _req$body6.contrasena,
      celular = _req$body6.celular,
      email = _req$body6.email,
      provincia = _req$body6.provincia,
      canton = _req$body6.canton,
      distrito = _req$body6.distrito,
      senas = _req$body6.senas;

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
  var _req$body7 = req.body,
      idMiembro = _req$body7.idMiembro,
      nombre = _req$body7.nombre,
      celular = _req$body7.celular,
      email = _req$body7.email,
      provincia = _req$body7.provincia,
      canton = _req$body7.canton,
      distrito = _req$body7.distrito,
      senas = _req$body7.senas,
      posible_monitor = _req$body7.posible_monitor;

  try {
    controlador.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento);
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
  var _req$body8 = req.body,
      nombre = _req$body8.nombre,
      direccionWeb = _req$body8.direccionWeb,
      logo = _req$body8.logo,
      pais = _req$body8.pais,
      provincia = _req$body8.provincia,
      canton = _req$body8.canton,
      distrito = _req$body8.distrito,
      senas = _req$body8.senas,
      telefonos = _req$body8.telefonos;

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
  var _req$body9 = req.body,
      idZona = _req$body9.idZona,
      nombre = _req$body9.nombre,
      idJefeNuevo1 = _req$body9.idJefeNuevo1,
      idJefeNuevo2 = _req$body9.idJefeNuevo2,
      idJefeViejo1 = _req$body9.idJefeViejo1,
      idJefeViejo2 = _req$body9.idJefeViejo2;

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
  var _req$body10 = req.body,
      idZona = _req$body10.idZona,
      idRama = _req$body10.idRama,
      nombre = _req$body10.nombre,
      idJefeNuevo1 = _req$body10.idJefeNuevo1,
      idJefeNuevo2 = _req$body10.idJefeNuevo2,
      idJefeViejo1 = _req$body10.idJefeViejo1,
      idJefeViejo2 = _req$body10.idJefeViejo2;

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
  var _req$body11 = req.body,
      idZona = _req$body11.idZona,
      idRama = _req$body11.idRama,
      idGrupo = _req$body11.idGrupo,
      nombre = _req$body11.nombre,
      isMonitor = _req$body11.isMonitor,
      idJefeNuevo1 = _req$body11.idJefeNuevo1,
      idJefeNuevo2 = _req$body11.idJefeNuevo2,
      idJefeViejo1 = _req$body11.idJefeViejo1,
      idJefeViejo2 = _req$body11.idJefeViejo2;

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
  //const { idMovimiento } = req.body;
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
  var _req$body12 = req.body,
      idZona = _req$body12.idZona,
      idRama = _req$body12.idRama;

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
  var _req$body13 = req.body,
      idZona = _req$body13.idZona,
      idRama = _req$body13.idRama,
      idGrupo = _req$body13.idGrupo;

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
  var idMiembro = req.body.idMiembro;

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
  var _req$body14 = req.body,
      idZona = _req$body14.idZona,
      idRama = _req$body14.idRama;

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
  var _req$body15 = req.body,
      idZona = _req$body15.idZona,
      idRama = _req$body15.idRama,
      idMiembro = _req$body15.idMiembro;

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
  var _req$body16 = req.body,
      idZona = _req$body16.idZona,
      idRama = _req$body16.idRama,
      idGrupo = _req$body16.idGrupo;

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
  var _req$body17 = req.body,
      idZona = _req$body17.idZona,
      idRama = _req$body17.idRama;

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
  var idZona = req.body.idZona;

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
  var _req$body18 = req.body,
      idZona = _req$body18.idZona,
      idRama = _req$body18.idRama,
      idGrupo = _req$body18.idGrupo;

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
  var idZona = req.body.idZona;

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
  var _req$body19 = req.body,
      idZona = _req$body19.idZona,
      idRama = _req$body19.idRama,
      idGrupo = _req$body19.idGrupo,
      idMiembro = _req$body19.idMiembro;

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
  var _req$body20 = req.body,
      idZona = _req$body20.idZona,
      idRama = _req$body20.idRama,
      idGrupoViejo = _req$body20.idGrupoViejo,
      idGrupoNuevo = _req$body20.idGrupoNuevo,
      idMiembro = _req$body20.idMiembro;

  try {
    /*controlador.agregarMiembroNuevoAGrupo(idMovimiento, idZona, idRama, idGrupoNuevo, idMiembro)
    .then( () => {
        controlador.eliminarMiembroGrupo(idMovimiento, idZona, idRama, idGrupoViejo, idMiembro)
        .then( () => {
            return res.json({ success: true});
        })
        .catch(err => {
            controlador.eliminarMiembroGrupo(idMovimiento, idZona, idRama, idGrupoNuevo, idMiembro);
            throw err
        })
    })
    .catch( err => {
        return res.json({success: false, error: {message: err.message}})
    })*/
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
  var _req$body21 = req.body,
      idZona = _req$body21.idZona,
      idRama = _req$body21.idRama,
      idGrupo = _req$body21.idGrupo,
      idMiembro = _req$body21.idMiembro,
      idMiembro2 = _req$body21.idMiembro2,
      isMonitor = _req$body21.isMonitor;

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
  var _req$body22 = req.body,
      idZona = _req$body22.idZona,
      idRama = _req$body22.idRama,
      idMiembro = _req$body22.idMiembro,
      idMiembro2 = _req$body22.idMiembro2,
      isMonitor = _req$body22.isMonitor;

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
  var _req$body23 = req.body,
      idZona = _req$body23.idZona,
      idMiembro = _req$body23.idMiembro,
      idMiembro2 = _req$body23.idMiembro2,
      isMonitor = _req$body23.isMonitor;

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