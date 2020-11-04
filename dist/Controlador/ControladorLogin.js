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
      var _verificarCombinaciN = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, pass, tipo) {
        var res, idMovimiento;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.dao.loginAsesor(id, pass);

              case 3:
                res = _context.sent;

                if (!res[0].encontrado) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return this.creador.cargarMovimiento(id);

              case 7:
                idMovimiento = _context.sent;

              case 8:
                Promise.resolve(idMovimiento);
                res[0].idMovimiento = idMovimiento;
                return _context.abrupt("return", res[0]);

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 13]]);
      }));

      function verificarCombinaciN(_x, _x2, _x3) {
        return _verificarCombinaciN.apply(this, arguments);
      }

      return verificarCombinaciN;
    }()
  }]);
  return ControladorLogin;
}();

exports["default"] = ControladorLogin;