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
    key: "crearZonaNueva",
    value: function () {
      var _crearZonaNueva = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(idMovimiento, nombre) {
        var _this = this;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.dao.insertarZona(idMovimiento, nombre).then(function (res) {
                  _this.agregarZona(idMovimiento, res[0].id_zona.toString(), nombre);
                })["catch"](function (err) {
                  throw err;
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function crearZonaNueva(_x, _x2) {
        return _crearZonaNueva.apply(this, arguments);
      }

      return crearZonaNueva;
    }()
  }, {
    key: "crearRamaNueva",
    value: function () {
      var _crearRamaNueva = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(idMovimiento, idZona, nombre) {
        var _this2 = this;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.dao.insertarRama(idMovimiento, idZona, nombre).then(function (res) {
                  _this2.agregarRama(idMovimiento, idZona, res[0].id_rama.toString(), nombre);
                })["catch"](function (err) {
                  throw err;
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function crearRamaNueva(_x3, _x4, _x5) {
        return _crearRamaNueva.apply(this, arguments);
      }

      return crearRamaNueva;
    }()
  }, {
    key: "crearGrupoNuevo",
    value: function () {
      var _crearGrupoNuevo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isMonitor) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!idEncargado2) {
                  idEncargado2 = "";
                }

                if (!nombre) {
                  nombre = idZona + idRama + idGrupo;
                }

                _context3.next = 4;
                return this.dao.insertarGrupo(idMovimiento, idZona, idRama, idGrupo, isMonitor, nombre, idEncargado1, idEncargado2);

              case 4:
                this.agregarGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, isMonitor, idEncargado1, idEncargado2);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function crearGrupoNuevo(_x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13) {
        return _crearGrupoNuevo.apply(this, arguments);
      }

      return crearGrupoNuevo;
    }()
  }, {
    key: "crearMiembroNuevo",
    value: function () {
      var _crearMiembroNuevo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo) {
        var movimiento;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                movimiento = this.getMovimiento(idMovimiento);

                if (!movimiento.gMiembros.miembros.has(idMiembro)) {
                  _context4.next = 3;
                  break;
                }

                throw {
                  message: "Ya existe un miembro con ese id en el movimiento"
                };

              case 3:
                _context4.next = 5;
                return this.dao.insertarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor)["catch"](function (err) {
                  throw err;
                });

              case 5:
                _context4.next = 7;
                return this.dao.insertarMiembroAGrupo(idGrupo, idMiembro, idRama, idZona, idMovimiento)["catch"](function (err) {
                  throw err;
                });

              case 7:
                this.agregarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function crearMiembroNuevo(_x14, _x15, _x16, _x17, _x18, _x19, _x20, _x21, _x22, _x23, _x24, _x25, _x26) {
        return _crearMiembroNuevo.apply(this, arguments);
      }

      return crearMiembroNuevo;
    }()
  }, {
    key: "cambioDeGrupo",
    value: function () {
      var _cambioDeGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(idMovimiento, idZona, idRama, idGrupoNuevo, idGrupoViejo, idMiembro) {
        var movimiento;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.dao.cambioMiembroGrupo(idMiembro, idGrupoViejo, idGrupoNuevo, idRama, idZona, idMovimiento);

              case 2:
                this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupoNuevo, idMiembro);
                movimiento = this.getMovimiento(idMovimiento);
                movimiento.gNodos.eliminarDeGrupo(idZona, idRama, idGrupoViejo, idMiembro);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function cambioDeGrupo(_x27, _x28, _x29, _x30, _x31, _x32) {
        return _cambioDeGrupo.apply(this, arguments);
      }

      return cambioDeGrupo;
    }()
  }, {
    key: "agregarZona",
    value: function agregarZona(idMovimiento, idZona, nombre, idEncargado1, idEncargado2) {
      var movimiento = this.getMovimiento(idMovimiento);
      movimiento.gNodos.crearZona(idZona, nombre, idEncargado1, idEncargado2);
    }
  }, {
    key: "agregarRama",
    value: function agregarRama(idMovimiento, idZona, idRama, nombre, idEncargado1, idEncargado2) {
      var movimiento = this.getMovimiento(idMovimiento);
      movimiento.gNodos.crearRama(idZona, idRama, nombre, idEncargado1, idEncargado2);
    }
  }, {
    key: "agregarGrupo",
    value: function agregarGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, isMonitor, idEncargado1, idEncargado2) {
      var movimiento = this.getMovimiento(idMovimiento);
      movimiento.gNodos.crearGrupo(idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isMonitor);
    }
  }, {
    key: "agregarMiembro",
    value: function agregarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo) {
      this.agregarMiembroAMovimiento(idMovimiento, idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);
      this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro);
    }
  }, {
    key: "agregarMiembroAMovimiento",
    value: function agregarMiembroAMovimiento(idMovimiento, idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor) {
      var movimiento = this.getMovimiento(idMovimiento);
      movimiento.gMiembros.crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);
    }
  }, {
    key: "agregarMiembroNuevoAGrupo",
    value: function () {
      var _agregarMiembroNuevoAGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(idMovimiento, idZona, idRama, idGrupo, idMiembro) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.dao.insertarMiembroAGrupo(idGrupo, idMiembro, idRama, idZona, idMovimiento);

              case 2:
                this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function agregarMiembroNuevoAGrupo(_x33, _x34, _x35, _x36, _x37) {
        return _agregarMiembroNuevoAGrupo.apply(this, arguments);
      }

      return agregarMiembroNuevoAGrupo;
    }()
  }, {
    key: "eliminarMiembroGrupo",
    value: function () {
      var _eliminarMiembroGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(idMovimiento, idZona, idRama, idGrupo, idMiembro) {
        var movimiento;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                movimiento = this.getMovimiento(idMovimiento);
                _context7.next = 3;
                return this.dao.eliminarDeGrupo(idMiembro, idGrupo, idRama, idZona, idMovimiento);

              case 3:
                movimiento.gNodos.eliminarDeGrupo(idZona, idRama, idGrupo, idMiembro);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function eliminarMiembroGrupo(_x38, _x39, _x40, _x41, _x42) {
        return _eliminarMiembroGrupo.apply(this, arguments);
      }

      return eliminarMiembroGrupo;
    }()
  }, {
    key: "agregarMiembroGrupo",
    value: function agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro) {
      var grupo = this.getGrupo(idMovimiento, idZona, idRama, idGrupo);
      var miembro = this.getMiembro(idMovimiento, idMiembro);
      grupo.agregar(miembro);
    }
  }, {
    key: "asignarEncargadoGrupo",
    value: function asignarEncargadoGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro, idMiembro2, isMonitor) {
      var grupo = this.getRama(idMovimiento, idZona, idRama, idGrupo);
      this.asignarJefeNodo(grupo, idMiembro, idMiembro2, isMonitor);
    }
  }, {
    key: "asignarEncargadoRama",
    value: function asignarEncargadoRama(idMovimiento, idZona, idRama, idMiembro, idMiembro2, isMonitor) {
      var rama = this.getRama(idMovimiento, idZona, idRama);
      this.asignarJefeNodo(rama, idMiembro, idMiembro2, isMonitor);
    }
  }, {
    key: "asignarEncargadoZona",
    value: function asignarEncargadoZona(idMovimiento, idZona, idMiembro, idMiembro2, isMonitor) {
      var zona = this.getZona(idMovimiento, idZona);
      this.asignarJefeNodo(zona, idMiembro, idMiembro2, isMonitor);
    }
  }, {
    key: "asignarJefeNodo",
    value: function asignarJefeNodo(nodo, idMiembro, idMiembro2, isMonitor) {
      nodo.asignarEncargados(idMiembro, idMiembro2, isMonitor);
    }
  }, {
    key: "modificarMovimiento",
    value: function () {
      var _modificarMovimiento = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(idMovimiento, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas, telefonos) {
        var movimiento, i;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                movimiento = this.getMovimiento(idMovimiento);
                movimiento.telefonos = [];

                for (i in telefonos) {
                  movimiento.telefonos.push(telefonos[i]);
                }

                _context8.next = 5;
                return this.dao.modificarMovimiento(idMovimiento, nombre, pais, provincia, canton, distrito, senas, direccionWeb, logo, movimiento.telefonos);

              case 5:
                movimiento.cedulaJuridica = idMovimiento;
                movimiento.nombre = nombre;
                movimiento.direccionWeb = direccionWeb;
                movimiento.logo = logo;
                movimiento.pais = pais;
                movimiento.provincia = provincia;
                movimiento.canton = canton;
                movimiento.distrito = distrito;
                movimiento.senas = senas;

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function modificarMovimiento(_x43, _x44, _x45, _x46, _x47, _x48, _x49, _x50, _x51, _x52) {
        return _modificarMovimiento.apply(this, arguments);
      }

      return modificarMovimiento;
    }()
  }, {
    key: "modificarZona",
    value: function () {
      var _modificarZona = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(idMovimiento, idZona, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2) {
        var zona;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;

                if (!(idJefeNuevo1 != idJefeViejo1 && idJefeViejo1 && idJefeNuevo2 != idJefeViejo1)) {
                  _context9.next = 4;
                  break;
                }

                _context9.next = 4;
                return this.dao.eliminarJefeZona(idJefeViejo1, idZona, idMovimiento);

              case 4:
                if (!(idJefeNuevo2 != idJefeViejo2 && idJefeViejo2 && idJefeNuevo1 != idJefeViejo2)) {
                  _context9.next = 7;
                  break;
                }

                _context9.next = 7;
                return this.dao.eliminarJefeZona(idJefeViejo2, idZona, idMovimiento);

              case 7:
                if (!(idJefeNuevo1 && idJefeNuevo1 != idJefeViejo1 && idJefeNuevo1 != idJefeViejo2)) {
                  _context9.next = 10;
                  break;
                }

                _context9.next = 10;
                return this.dao.asignarJefeZona(idJefeNuevo1, idZona, idMovimiento);

              case 10:
                if (!(idJefeNuevo2 && idJefeNuevo2 != idJefeViejo1 && idJefeNuevo2 != idJefeViejo2)) {
                  _context9.next = 13;
                  break;
                }

                _context9.next = 13;
                return this.dao.asignarJefeZona(idJefeNuevo2, idZona, idMovimiento);

              case 13:
                zona = this.getZona(idMovimiento, idZona);

                if (!(zona.nombre != nombre)) {
                  _context9.next = 17;
                  break;
                }

                _context9.next = 17;
                return this.dao.modificarZona(idMovimiento, idZona, nombre);

              case 17:
                zona.nombre = nombre;
                zona.setEncargado1(idJefeNuevo1);
                zona.setEncargado2(idJefeNuevo2);
                _context9.next = 25;
                break;

              case 22:
                _context9.prev = 22;
                _context9.t0 = _context9["catch"](0);
                throw _context9.t0;

              case 25:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 22]]);
      }));

      function modificarZona(_x53, _x54, _x55, _x56, _x57, _x58, _x59) {
        return _modificarZona.apply(this, arguments);
      }

      return modificarZona;
    }()
  }, {
    key: "verificarEliminarJefe",
    value: function verificarEliminarJefe(nodo, idJefeViejo) {
      if (nodo.encargado1 == idJefeViejo || nodo.encargado2 == idJefeViejo) {
        var contador = 0;
        var composites = nodo.composites;
        composites.forEach(function (value, key) {
          if (value.encargado1 == idJefeViejo) contador++;
          if (value.encargado2 == idJefeViejo) contador++;
        });
        if (contador == 1) throw {
          message: "No se puede eliminar el jefe " + idJefeViejo + " ya que es lider de un nodo superior"
        };
      }
    }
  }, {
    key: "modificarRama",
    value: function () {
      var _modificarRama = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(idMovimiento, idZona, idRama, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2) {
        var zona, rama;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                zona = this.getZona(idMovimiento, idZona);

                if (!(idJefeNuevo1 != idJefeViejo1 && idJefeViejo1 && idJefeNuevo2 != idJefeViejo1)) {
                  _context10.next = 6;
                  break;
                }

                this.verificarEliminarJefe(zona, idJefeViejo1);
                _context10.next = 6;
                return this.dao.eliminarJefeRama(idJefeViejo1, idZona, idRama, idMovimiento);

              case 6:
                if (!(idJefeNuevo2 != idJefeViejo2 && idJefeViejo2 && idJefeNuevo1 != idJefeViejo2)) {
                  _context10.next = 10;
                  break;
                }

                this.verificarEliminarJefe(zona, idJefeViejo2);
                _context10.next = 10;
                return this.dao.eliminarJefeRama(idJefeViejo2, idZona, idRama, idMovimiento);

              case 10:
                if (!(idJefeNuevo1 && idJefeNuevo1 != idJefeViejo1 && idJefeNuevo1 != idJefeViejo2)) {
                  _context10.next = 13;
                  break;
                }

                _context10.next = 13;
                return this.dao.asignarJefeRama(idJefeNuevo1, idZona, idRama, idMovimiento);

              case 13:
                if (!(idJefeNuevo2 && idJefeNuevo2 != idJefeViejo1 && idJefeNuevo2 != idJefeViejo2)) {
                  _context10.next = 16;
                  break;
                }

                _context10.next = 16;
                return this.dao.asignarJefeRama(idJefeNuevo2, idZona, idRama, idMovimiento);

              case 16:
                rama = this.getRama(idMovimiento, idZona, idRama);

                if (!(rama.nombre != nombre)) {
                  _context10.next = 20;
                  break;
                }

                _context10.next = 20;
                return this.dao.modificarRama(idMovimiento, idZona, idRama, nombre);

              case 20:
                rama.nombre = nombre;
                rama.setEncargado1(idJefeNuevo1);
                rama.setEncargado2(idJefeNuevo2);
                _context10.next = 28;
                break;

              case 25:
                _context10.prev = 25;
                _context10.t0 = _context10["catch"](0);
                throw _context10.t0;

              case 28:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 25]]);
      }));

      function modificarRama(_x60, _x61, _x62, _x63, _x64, _x65, _x66, _x67) {
        return _modificarRama.apply(this, arguments);
      }

      return modificarRama;
    }()
  }, {
    key: "modificarGrupo",
    value: function () {
      var _modificarGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(idMovimiento, idZona, idRama, idGrupo, nombre, isMonitor, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2) {
        var rama, grupo;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                rama = this.getRama(idMovimiento, idZona, idRama);

                if (!(idJefeNuevo1 != idJefeViejo1 && idJefeViejo1 && idJefeNuevo2 != idJefeViejo1)) {
                  _context11.next = 6;
                  break;
                }

                this.verificarEliminarJefe(rama, idJefeViejo1);
                _context11.next = 6;
                return this.dao.eliminarJefeGrupo(idJefeViejo1, idZona, idRama, idGrupo, idMovimiento);

              case 6:
                if (!(idJefeNuevo2 != idJefeViejo2 && idJefeViejo2 && idJefeNuevo1 != idJefeViejo2)) {
                  _context11.next = 10;
                  break;
                }

                this.verificarEliminarJefe(rama, idJefeViejo2);
                _context11.next = 10;
                return this.dao.eliminarJefeGrupo(idJefeViejo2, idZona, idRama, idGrupo, idMovimiento);

              case 10:
                if (!(idJefeNuevo1 && idJefeNuevo1 != idJefeViejo1 && idJefeNuevo1 != idJefeViejo2)) {
                  _context11.next = 18;
                  break;
                }

                if (!isMonitor) {
                  _context11.next = 16;
                  break;
                }

                _context11.next = 14;
                return this.dao.asignarMonitorGrupo(idJefeNuevo1, idZona, idRama, idGrupo, idMovimiento);

              case 14:
                _context11.next = 18;
                break;

              case 16:
                _context11.next = 18;
                return this.dao.asignarJefeGrupo(idJefeNuevo1, idZona, idRama, idGrupo, idMovimiento);

              case 18:
                if (!(idJefeNuevo2 && idJefeNuevo2 != idJefeViejo1 && idJefeNuevo2 != idJefeViejo2)) {
                  _context11.next = 26;
                  break;
                }

                if (!isMonitor) {
                  _context11.next = 24;
                  break;
                }

                _context11.next = 22;
                return this.dao.asignarMonitorGrupo(idJefeNuevo2, idZona, idRama, idGrupo, idMovimiento);

              case 22:
                _context11.next = 26;
                break;

              case 24:
                _context11.next = 26;
                return this.dao.asignarJefeGrupo(idJefeNuevo2, idZona, idRama, idGrupo, idMovimiento);

              case 26:
                grupo = this.getGrupo(idMovimiento, idZona, idRama, idGrupo);

                if (!(grupo.nombre != nombre || grupo.isMonitor != isMonitor)) {
                  _context11.next = 30;
                  break;
                }

                _context11.next = 30;
                return this.dao.modificarGrupo(idMovimiento, idZona, idRama, idGrupo, isMonitor, nombre);

              case 30:
                grupo.nombre = nombre;
                grupo.isMonitor = isMonitor;
                grupo.setEncargado1(idJefeNuevo1);
                grupo.setEncargado2(idJefeNuevo2);
                _context11.next = 39;
                break;

              case 36:
                _context11.prev = 36;
                _context11.t0 = _context11["catch"](0);
                throw _context11.t0;

              case 39:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 36]]);
      }));

      function modificarGrupo(_x68, _x69, _x70, _x71, _x72, _x73, _x74, _x75, _x76, _x77) {
        return _modificarGrupo.apply(this, arguments);
      }

      return modificarGrupo;
    }()
  }, {
    key: "modificarMiembro",
    value: function () {
      var _modificarMiembro = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento) {
        var movimiento, gMiembros;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.dao.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);

              case 2:
                movimiento = this.getMovimiento(idMovimiento);
                gMiembros = movimiento.gMiembros;
                gMiembros.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function modificarMiembro(_x78, _x79, _x80, _x81, _x82, _x83, _x84, _x85, _x86, _x87) {
        return _modificarMiembro.apply(this, arguments);
      }

      return modificarMiembro;
    }()
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
    key: "consultarRamasMiembro",
    value: function () {
      var _consultarRamasMiembro = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(idMiembro) {
        var ramas;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.dao.ramasDeMiembros(idMiembro);

              case 2:
                ramas = _context13.sent;
                return _context13.abrupt("return", ramas);

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function consultarRamasMiembro(_x88) {
        return _consultarRamasMiembro.apply(this, arguments);
      }

      return consultarRamasMiembro;
    }()
  }, {
    key: "consultarRamasDisponibles",
    value: function () {
      var _consultarRamasDisponibles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(idMiembro) {
        var ramas;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                ramas = this.dao.otrasRamas(idMiembro);
                return _context14.abrupt("return", ramas);

              case 5:
                _context14.prev = 5;
                _context14.t0 = _context14["catch"](0);
                throw _context14.t0;

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 5]]);
      }));

      function consultarRamasDisponibles(_x89) {
        return _consultarRamasDisponibles.apply(this, arguments);
      }

      return consultarRamasDisponibles;
    }()
  }, {
    key: "consultarGrupos",
    value: function consultarGrupos(idMovimiento, idZona, idRama) {
      var movimiento = this.getMovimiento(idMovimiento);
      return movimiento.gNodos.consultarGrupos(idZona, idRama);
    }
  }, {
    key: "consultarGrupoDeMiembroEnRama",
    value: function () {
      var _consultarGrupoDeMiembroEnRama = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(idMovimiento, idZona, idRama, idMiembro) {
        var grupos;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this.dao.grupoDeMiembroEnRama(idMovimiento, idZona, idRama, idMiembro);

              case 2:
                grupos = _context15.sent;
                return _context15.abrupt("return", grupos);

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function consultarGrupoDeMiembroEnRama(_x90, _x91, _x92, _x93) {
        return _consultarGrupoDeMiembroEnRama.apply(this, arguments);
      }

      return consultarGrupoDeMiembroEnRama;
    }()
  }, {
    key: "consultarMiembrosGrupo",
    value: function consultarMiembrosGrupo(idMovimiento, idZona, idRama, idGrupo) {
      var movimiento = this.getMovimiento(idMovimiento);
      var grupo = this.getGrupo(idMovimiento, idZona, idRama, idGrupo);
      var miembros = movimiento.gNodos.consultarMiembrosGrupo(idZona, idRama, idGrupo);

      if (grupo.encargado1 && !miembros.has(grupo.encargado1)) {
        miembros.set(grupo.encargado1, this.getMiembro(idMovimiento, grupo.encargado1));
      }

      if (grupo.encargado2 && !miembros.has(grupo.encargado2)) {
        miembros.set(grupo.encargado1, this.getMiembro(idMovimiento, grupo.encargado2));
      }

      return miembros;
    }
  }, {
    key: "consultarMiembrosRama",
    value: function consultarMiembrosRama(idMovimiento, idZona, idRama) {
      var _this3 = this;

      var movimiento = this.getMovimiento(idMovimiento);
      var rama = this.getRama(idMovimiento, idZona, idRama);
      var idMiembros = movimiento.gNodos.consultarMiembrosNodo(rama);
      var miembros = [];
      idMiembros.forEach(function (id) {
        miembros.push(_this3.getMiembro(idMovimiento, id));
      });
      return miembros;
    }
  }, {
    key: "consultarMiembrosZona",
    value: function consultarMiembrosZona(idMovimiento, idZona) {
      var _this4 = this;

      var movimiento = this.getMovimiento(idMovimiento);
      var zona = this.getZona(idMovimiento, idZona);
      var idMiembros = movimiento.gNodos.consultarMiembrosNodo(zona);
      var miembros = [];
      idMiembros.forEach(function (id) {
        miembros.push(_this4.getMiembro(idMovimiento, id));
      });
      return miembros;
    }
  }, {
    key: "consultarMonitoresProbables",
    value: function () {
      var _consultarMonitoresProbables = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(idMovimiento, idZona, idRama, idGrupo) {
        var monitores;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return this.dao.monitoresProbables(idMovimiento, idZona, idRama, idGrupo);

              case 2:
                monitores = _context16.sent;
                return _context16.abrupt("return", monitores);

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function consultarMonitoresProbables(_x94, _x95, _x96, _x97) {
        return _consultarMonitoresProbables.apply(this, arguments);
      }

      return consultarMonitoresProbables;
    }()
  }, {
    key: "consultarMonitoresZona",
    value: function () {
      var _consultarMonitoresZona = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(idMovimiento, idZona) {
        var monitores;
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return this.dao.todosLosMonitores(idMovimiento, idZona);

              case 2:
                monitores = _context17.sent;
                return _context17.abrupt("return", monitores);

              case 4:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function consultarMonitoresZona(_x98, _x99) {
        return _consultarMonitoresZona.apply(this, arguments);
      }

      return consultarMonitoresZona;
    }()
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
      var _getGruposMiembro = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(idMiembro) {
        var grupos, res, i, grupoInfo;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                grupos = [];
                _context18.next = 4;
                return this.dao.getGruposXMiembro(idMiembro);

              case 4:
                res = _context18.sent;

                for (i in res) {
                  grupoInfo = res[i];
                  grupos.push(grupoInfo);
                }

                return _context18.abrupt("return", grupos);

              case 9:
                _context18.prev = 9;
                _context18.t0 = _context18["catch"](0);
                throw _context18.t0;

              case 12:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[0, 9]]);
      }));

      function getGruposMiembro(_x100) {
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