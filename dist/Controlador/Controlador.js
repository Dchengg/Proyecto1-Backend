"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Movimiento = _interopRequireDefault(require("./Movimiento.js"));

var _ControladorLogin = _interopRequireDefault(require("./ControladorLogin"));

var _DAO = _interopRequireDefault(require("./DAO"));

var Controlador = /*#__PURE__*/function () {
  function Controlador() {
    (0, _classCallCheck2["default"])(this, Controlador);
    this.movimientos = new Map();
    this.dao = new _DAO["default"](); //this.movimientos.set(1,new Movimiento("1","123","movimiento","http:..","cool","CR","SJ","P","C","D","Del palo de limón, tres cuadras norte :v"))
  }

  (0, _createClass2["default"])(Controlador, [{
    key: "crearMovimiento",
    value: function crearMovimiento(cedulaJuridica, idAsesor, nombre, direccionWeb, logo, pais, provimicia, canton, distrito, senas) {
      if (this.movimientos.has(cedulaJuridica)) {
        throw {
          message: "Movimiento con el id: " + cedulaJuridica + " ya existe"
        };
      }

      this.movimientos.set(cedulaJuridica, new _Movimiento["default"](cedulaJuridica, idAsesor, nombre, direccionWeb, logo, pais, provimicia, canton, distrito, senas));
    }
  }, {
    key: "crearZona",
    value: function crearZona(idMovimiento, idZona, nombre) {
      if (this.movimientos.has(idMovimiento)) {
        this.movimientos.get(idMovimiento).gNodos.crearZona(idZona, nombre);
      } else {
        throw {
          message: "Movimiento no existe " + idMovimiento
        };
      }
    }
  }, {
    key: "crearRama",
    value: function crearRama(idMovimiento, idZona, idRama, nombre) {
      this.movimientos.get(idMovimiento).gNodos.crearRama(idZona, idRama, nombre);
    }
  }, {
    key: "crearGrupo",
    value: function crearGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isJefe) {
      try {
        var encargado1 = this.getMiembro(idEncargado1);
        var encargado2 = this.getMiembro(idEncargado2);
      } catch (err) {
        console.log("encargado no valido");
      }

      this.movimientos.get(idMovimiento).gNodos.crearGrupo(idZona, idRama, idGrupo, nombre, encargado1, encargado2);
    }
  }, {
    key: "crearMiembro",
    value: function crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo) {
      if (this.movimientos.has(idMovimiento)) {
        var gMiembros = this.movimientos.get(idMovimiento).gMiembros;
        var gNodos = this.movimientos.get(idMovimiento).gNodos;
        var miembro = gMiembros.crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo);
        gNodos.agregarMiembro(idZona, idRama, idGrupo, miembro);
      } else {
        throw {
          message: "Movimiento no existe"
        };
      }
    }
  }, {
    key: "agregarMiembroGrupo",
    value: function agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro) {
      var grupo = this.getGrupo(idMovimiento, idZona, idRama, idGrupo);
      var miembro = this.getMiembro(idMovimiento, idMiembro);
      grupo.agregar(miembro);
    }
  }, {
    key: "asignarJefeGrupo",
    value: function asignarJefeGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro, idMiembro2) {
      var grupo = this.getGrupo(idMovimiento, idZona, idRama, idGrupo);

      try {} catch (err) {
        console.log(err);
      }

      var miembro = this.getMiembro(idMovimiento, idMiembro);
      grupo.encargado1 = miembro;
      grupo.encargado2 = idMiembro2;
    }
  }, {
    key: "asignarJefeRama",
    value: function asignarJefeRama(idMovimiento, idZona, idRama, idMiembro, idMiembro2) {
      var rama = this.getRama(idMovimiento, idZona, idRama);
      var miembro = this.getMiembro(idMovimiento, idMiembro);
      rama.encargado1 = miembro;
      rama.encargado2 = idMiembro2;
    }
  }, {
    key: "asignarJefeZona",
    value: function asignarJefeZona(idMovimiento, idZona, idMiembro, idMiembro2) {
      var zona = this.getZona(idMovimiento, idZona);
      var miembro = this.getMiembro(idMovimiento, idMiembro);
      zona.encargado1 = miembro;
      zona.encargado2 = idMiembro2;
    }
  }, {
    key: "modificarMovimiento",
    value: function modificarMovimiento(idMovimiento, idAsesor, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas) {
      var movimiento = this.getMovimiento(idMovimiento);
      movimiento.cedulaJuridica = idMovimiento;
      movimiento.idAsesor = idAsesor;
      movimiento.nombre = nombre;
      movimiento.direccionWeb = direccionWeb;
      movimiento.logo = logo;
      movimiento.pais = pais;
      movimiento.provincia = provincia;
      movimiento.canton = canton;
      movimiento.distrito = distrito;
      movimiento.senas = senas;
    }
  }, {
    key: "modificarMiembro",
    value: function modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo) {
      var movimiento = this.getMovimiento(idMovimiento);
      var gMiembros = movimiento.gMiembros;
      var miembro = gMiembros.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);
    }
  }, {
    key: "consultarZonas",
    value: function consultarZonas(idMovimiento) {
      if (this.movimientos.has(idMovimiento)) {
        return this.movimientos.get(idMovimiento).gNodos.zonas;
      } else {
        throw {
          message: "Movimiento no existe"
        };
      }
    }
  }, {
    key: "consultarRamas",
    value: function consultarRamas(idMovimiento, idZona) {
      var movimiento = this.getMovimiento(idMovimiento);
      return movimiento.gNodos.consultarRamas(idZona);
    }
  }, {
    key: "consultarRamasDisponibles",
    value: function () {
      var _consultarRamasDisponibles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(idMovimiento, idMiembro) {
        var gruposDeMiembro, ramas, i;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.getGruposMiembro(idMovimiento, idMiembro);

              case 3:
                gruposDeMiembro = _context.sent;
                ramas = new Map(this.consultarRamas(idMovimiento, gruposDeMiembro[0].id_zona.toString()));
                console.log(ramas);

                for (i in gruposDeMiembro) {
                  ramas["delete"](gruposDeMiembro[i].id_rama.toString());
                }

                return _context.abrupt("return", ramas);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                throw _context.t0;

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function consultarRamasDisponibles(_x, _x2) {
        return _consultarRamasDisponibles.apply(this, arguments);
      }

      return consultarRamasDisponibles;
    }()
  }, {
    key: "consultarGrupos",
    value: function consultarGrupos(idMovimiento, idZona, idRama) {
      return this.movimientos.get(idMovimiento).gNodos.consultarGrupos(idZona, idRama);
    }
  }, {
    key: "consultarMiembrosGrupo",
    value: function consultarMiembrosGrupo(idMovimiento, idZona, idRama, idGrupo) {
      return this.movimientos.get(idMovimiento).gNodos.consultarMiembrosGrupo(idZona, idRama, idGrupo);
    }
  }, {
    key: "consultarMiembrosRama",
    value: function consultarMiembrosRama(idMovimiento, idZona, idRama) {
      return this.movimientos.get(idMovimiento).gNodos.consultarMiembrosGrupo(idZona, idRama);
    }
  }, {
    key: "getMovimiento",
    value: function getMovimiento(idMovimiento) {
      if (this.movimientos.has(idMovimiento)) {
        return this.movimientos.get(idMovimiento);
      } else {
        throw {
          message: "Movimiento no existe " + idMovimiento
        };
      }
    }
  }, {
    key: "getMiembro",
    value: function getMiembro(idMovimiento, idMiembro) {
      var movimiento = this.getMovimiento(idMovimiento);
      var miembro = movimiento.gMiembros.getMiembro(idMiembro);

      if (miembro) {
        return miembro;
      } else {
        throw {
          message: "No existe ningún miembro con esa cedula"
        };
      }
    }
  }, {
    key: "getGruposMiembro",
    value: function () {
      var _getGruposMiembro = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(idMovimiento, idMiembro) {
        var grupos, res, i, grupoInfo;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                grupos = [];
                _context2.next = 4;
                return this.dao.getGruposXMiembro(idMiembro);

              case 4:
                res = _context2.sent;
                _context2.t0 = _regenerator["default"].keys(res);

              case 6:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 14;
                  break;
                }

                i = _context2.t1.value;
                console.log(res[i]);
                grupoInfo = res[i];
                grupos.push(grupoInfo);
                return _context2.abrupt("return", grupos);

              case 14:
                _context2.next = 19;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t2 = _context2["catch"](0);
                throw _context2.t2;

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 16]]);
      }));

      function getGruposMiembro(_x3, _x4) {
        return _getGruposMiembro.apply(this, arguments);
      }

      return getGruposMiembro;
    }()
  }, {
    key: "getZona",
    value: function getZona(idMovimiento, idZona) {
      var movimiento = this.getMovimiento(idMovimiento);
      var zona = movimiento.gNodos.getZona(idZona);

      if (zona == null) {
        throw {
          message: "No existe una zona con esa identificación"
        };
      }

      return zona;
    }
  }, {
    key: "getRama",
    value: function getRama(idMovimiento, idZona, idRama) {
      var movimiento = this.getMovimiento(idMovimiento);
      var rama = movimiento.gNodos.getRama(idZona, idRama);

      if (rama == null) {
        throw {
          message: "No existe una zona con esa identificación"
        };
      }

      return rama;
    }
  }, {
    key: "getGrupo",
    value: function getGrupo(idMovimiento, idZona, idRama, idGrupo) {
      var movimiento = this.getMovimiento(idMovimiento);
      var grupo = movimiento.gNodos.getGrupo(idZona, idRama, idGrupo);

      if (grupo == null) {
        throw {
          message: "No existe una grupo con esa identificación"
        };
      }

      return grupo;
    }
  }]);
  return Controlador;
}();

exports["default"] = Controlador;