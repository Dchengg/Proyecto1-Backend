"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Miembro = _interopRequireDefault(require("../Modelo/Miembro"));

var GestorMiembros = /*#__PURE__*/function () {
  function GestorMiembros() {
    (0, _classCallCheck2["default"])(this, GestorMiembros);
    this.miembros = new Map();
  }

  (0, _createClass2["default"])(GestorMiembros, [{
    key: "crearMiembro",
    value: function crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor) {
      if (this.miembros.has(idMiembro)) {
        throw {
          message: "Ya hay un miembro con esa cedula"
        };
      }

      var miembro = new _Miembro["default"](idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);
      this.miembros.set(idMiembro, miembro);
      return miembro;
    }
  }, {
    key: "modificarMiembro",
    value: function modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor) {
      var miembro = this.miembros.get(idMiembro);
      if (miembro == null) throw {
        message: "no existe el miembro " + idMiembro
      };
      miembro.nombre = nombre;
      miembro.celular = celular;
      miembro.email = email;
      miembro.provincia = provincia;
      miembro.canton = canton;
      miembro.distrito = distrito;
      miembro.senas = senas;
      miembro.posible_monitor = posible_monitor;
      return miembro;
    }
  }, {
    key: "getMiembro",
    value: function getMiembro(idMiembro) {
      return this.miembros.get(idMiembro);
    }
  }]);
  return GestorMiembros;
}();

exports["default"] = GestorMiembros;