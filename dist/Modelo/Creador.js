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
    key: "cargarMovimiento",
    value: function cargarMovimiento(cedulaAsesor) {
      var _this = this;

      var cedula_juridica;
      cedula_juridica = this.dao.getMovimientoXAsesor(cedulaAsesor).then(function (res) {
        var movimiento = res[0];

        try {
          _this.dao.getTelefonoMovimiento(movimiento.cedula_juridica).then(function (telefono) {
            _this.controlador.agregarMovimiento(movimiento.cedula_juridica, cedulaAsesor, movimiento.nombre, movimiento.direccion_web, movimiento.logo, movimiento.pais, movimiento.provincia, movimiento.canton, movimiento.distrito, movimiento.senales, telefono);
            /*var mov = this.controlador.getMovimiento(movimiento.cedula_juridica);
            for(var i in telefono){
                mov.telefonos.push(telefono[i].celular);
            }*/

          });

          _this.cargarZonasMovimiento(movimiento.cedula_juridica);

          cedula_juridica = movimiento.cedula_juridica;

          _this.dao.getAsesor(cedulaAsesor).then(function (res) {
            var miembro = res[0];
            console.log(cedula_juridica);

            _this.controlador.agregarMiembroAMovimiento(cedula_juridica, miembro.cedula, miembro.nombre, miembro.celular, miembro.email, miembro.provincia, miembro.canton, miembro.distrito, miembro.senales, miembro.b_monitor);
          });
        } catch (err) {
          console.log(err);
        }

        return movimiento.cedula_juridica;
      });
      return cedula_juridica;
    }
  }, {
    key: "cargarZonasMovimiento",
    value: function cargarZonasMovimiento(idMovimiento) {
      var _this2 = this;

      this.dao.getZonaXMovimiento(idMovimiento).then(function (res) {
        for (var i in res) {
          var zona = res[i];

          try {
            _this2.controlador.agregarZona(idMovimiento, zona.id_zona.toString(), zona.nombre, zona.jefe1, zona.jefe2);
          } catch (err) {
            console.log(err);
          }
        }

        _this2.cargarRamasMovimiento(idMovimiento);
      });
    }
  }, {
    key: "cargarRamasMovimiento",
    value: function cargarRamasMovimiento(idMovimiento) {
      var _this3 = this;

      this.dao.getRamaXMovimiento(idMovimiento).then(function (res) {
        for (var i in res) {
          try {
            var rama = res[i];

            _this3.controlador.agregarRama(idMovimiento, rama.id_zona.toString(), rama.id_rama.toString(), rama.nombre, rama.jefe1, rama.jefe2);
          } catch (err) {
            console.log(err);
          }
        } //this.cargarMiembrosMovimiento(idMovimiento);


        _this3.cargarGruposMovimiento(idMovimiento);
      });
    }
  }, {
    key: "cargarGruposMovimiento",
    value: function cargarGruposMovimiento(idMovimiento) {
      var _this4 = this;

      this.dao.getGrupoXMovimiento(idMovimiento).then(function (res) {
        for (var i in res) {
          try {
            var grupo = res[i];

            _this4.controlador.agregarGrupo(idMovimiento, grupo.id_zona.toString(), grupo.id_rama.toString(), grupo.id_grupo.toString(), grupo.nombre, grupo.b_monitor, grupo.jefe1, grupo.jefe2);
          } catch (err) {
            console.log(err);
          }
        }

        _this4.cargarMiembrosMovimiento(idMovimiento);
      });
    }
  }, {
    key: "cargarMiembrosMovimiento",
    value: function cargarMiembrosMovimiento(idMovimiento) {
      var _this5 = this;

      this.dao.getMiembroXMovimiento(idMovimiento).then(function (res) {
        for (var i in res) {
          try {
            var miembro = res[i];

            _this5.controlador.agregarMiembro(miembro.cedula, miembro.nombre, miembro.celular, miembro.email, miembro.provincia, miembro.canton, miembro.distrito, miembro.senales, miembro.b_monitor, idMovimiento, miembro.id_zona.toString(), miembro.id_rama.toString(), miembro.id_grupo.toString());
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