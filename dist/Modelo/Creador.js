"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _DAO = _interopRequireDefault(require("../Controlador/DAO"));

var _Controlador = _interopRequireDefault(require("../Controlador/Controlador"));

var _Movimiento = _interopRequireDefault(require("../Controlador/Movimiento"));

var Creador = /*#__PURE__*/function () {
  function Creador(controlador) {
    (0, _classCallCheck2["default"])(this, Creador);
    this.dao = new _DAO["default"]();
    this.controlador = controlador;
  }

  (0, _createClass2["default"])(Creador, [{
    key: "iniciarAPI",
    value: function iniciarAPI(cedulaAsesor, contrasena) {
      var _this = this;

      this.dao.loginAsesor(cedulaAsesor, contrasena).then(function (res) {
        if (res[0].encontrado) {
          _this.cargarMovimiento(cedulaAsesor);
        }

        throw {
          message: "Datos incorrectos"
        };
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "cargarMovimiento",
    value: function cargarMovimiento(cedulaAsesor) {
      var _this2 = this;

      this.dao.getMovimientoXAsesor(cedulaAsesor).then(function (res) {
        var movimiento = res[0];

        try {
          _this2.controlador.crearMovimiento(movimiento.cedula_juridica, cedulaAsesor, movimiento.nombre, movimiento.direccion_web, movimiento.logo, movimiento.pais, movimiento.provincia, movimiento.canton, movimiento.distrito, movimiento.senales);

          _this2.cargarZonasMovimiento(movimiento.cedula_juridica);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }, {
    key: "cargarZonasMovimiento",
    value: function cargarZonasMovimiento(idMovimiento) {
      var _this3 = this;

      console.log(idMovimiento);
      this.dao.getZonaXMovimiento(idMovimiento).then(function (res) {
        for (var i in res) {
          var zona = res[i];

          try {
            _this3.controlador.crearZona(idMovimiento, zona.id_zona.toString(), zona.nombre);
          } catch (err) {
            console.log(err);
          }
        }

        _this3.cargarRamasMovimiento(idMovimiento);
      });
    }
  }, {
    key: "cargarRamasMovimiento",
    value: function cargarRamasMovimiento(idMovimiento) {
      var _this4 = this;

      this.dao.getRamaXMovimiento(idMovimiento).then(function (res) {
        for (var i in res) {
          try {
            var rama = res[i];

            _this4.controlador.crearRama(idMovimiento, rama.id_zona.toString(), rama.id_rama.toString(), rama.nombre);
          } catch (err) {
            console.log(err);
          }
        } //this.cargarMiembrosMovimiento(idMovimiento);


        _this4.cargarGruposMovimiento(idMovimiento);
      });
    }
  }, {
    key: "cargarGruposMovimiento",
    value: function cargarGruposMovimiento(idMovimiento) {
      var _this5 = this;

      this.dao.getGrupoXMovimiento(idMovimiento).then(function (res) {
        for (var i in res) {
          try {
            var grupo = res[i];

            _this5.controlador.crearGrupo(idMovimiento, grupo.id_zona.toString(), grupo.id_rama.toString(), grupo.id_grupo.toString(), grupo.nombre);
          } catch (err) {
            console.log(err);
          }
        }

        _this5.cargarMiembrosMovimiento(idMovimiento);
      });
    }
  }, {
    key: "cargarMiembrosMovimiento",
    value: function cargarMiembrosMovimiento(idMovimiento) {
      var _this6 = this;

      this.dao.getMiembroXMovimiento(idMovimiento).then(function (res) {
        for (var i in res) {
          try {
            var miembro = res[i];

            _this6.controlador.crearMiembro(miembro.cedula, miembro.nombre, miembro.celular, miembro.email, miembro.provincia, miembro.canton, miembro.distrito, miembro.senales, miembro.b_monitor, idMovimiento, miembro.id_zona.toString(), miembro.id_rama.toString(), miembro.id_grupo.toString());
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  }]);
  return Creador;
}();

exports["default"] = Creador;