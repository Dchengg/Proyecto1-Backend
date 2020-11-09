"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Sesion = /*#__PURE__*/function () {
  function Sesion(id_usuario, id_movimiento, cookie_usuario) {
    (0, _classCallCheck2["default"])(this, Sesion);
    this.id_usuario = id_usuario;
    this.id_movimiento = id_movimiento;
    this.cookie_usuario = cookie_usuario;
  }

  (0, _createClass2["default"])(Sesion, [{
    key: "verificarCombinaci\xF3n",
    value: function verificarCombinaciN(id, pass, tipo) {}
  }, {
    key: "iniciarSesi\xF3n",
    value: function iniciarSesiN(usuario) {}
  }]);
  return Sesion;
}();