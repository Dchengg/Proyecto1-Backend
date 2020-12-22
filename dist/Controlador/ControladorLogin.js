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

var _DAO = _interopRequireDefault(require("./DAO"));

var _Creador = _interopRequireDefault(require("../Modelo/Creador"));

var ControladorLogin = /*#__PURE__*/function () {
  function ControladorLogin(controlador) {
    (0, _classCallCheck2["default"])(this, ControladorLogin);
    this.sesiones = new Map();
    this.dao = new _DAO["default"]();
    this.creador = new _Creador["default"](controlador);
  }

  (0, _createClass2["default"])(ControladorLogin, [{
    key: "verificarCombinaci\xF3n",
    value: function () {
      var _verificarCombinaciN = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, pass, idMovimiento) {
        var movimientos, userType;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.dao.getMovimientos();

              case 3:
                movimientos = _context.sent;

                if (!movimientos.find(function (element) {
                  return element.id_movimiento == idMovimiento;
                })) {
                  _context.next = 15;
                  break;
                }

                _context.next = 7;
                return this.dao.inicioSesion(id, pass, idMovimiento);

              case 7:
                userType = _context.sent;

                if (!userType[0].encontrado) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", "Asesor");

              case 12:
                return _context.abrupt("return", this.obtenerPermisos(id, idMovimiento));

              case 13:
                _context.next = 16;
                break;

              case 15:
                throw {
                  message: "Movimiento no existe " + idMovimiento
                };

              case 16:
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function verificarCombinaciN(_x, _x2, _x3) {
        return _verificarCombinaciN.apply(this, arguments);
      }

      return verificarCombinaciN;
    }()
  }, {
    key: "obtenerPermisos",
    value: function () {
      var _obtenerPermisos = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(idMiembro, idMovimiento) {
        var rolesUsuario, contador;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.dao.getGruposMiembroxMiembro(idMiembro, idMovimiento);

              case 2:
                rolesUsuario = _context2.sent;
                contador = 5;
                rolesUsuario = rolesUsuario.sort(function (a, b) {
                  return a.id_lider - b.id_lider;
                });
                return _context2.abrupt("return", rolesUsuario[0].nombre_lider);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function obtenerPermisos(_x4, _x5) {
        return _obtenerPermisos.apply(this, arguments);
      }

      return obtenerPermisos;
    }()
  }]);
  return ControladorLogin;
}();

exports["default"] = ControladorLogin;