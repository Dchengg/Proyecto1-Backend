"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Movimiento = _interopRequireDefault(require("./Movimiento.js"));

var _ControladorLogin = _interopRequireDefault(require("./ControladorLogin"));

var Controlador = /*#__PURE__*/function () {
  function Controlador() {
    (0, _classCallCheck2["default"])(this, Controlador);
    this.movimientos = new Map(); //this.movimientos.set(1,new Movimiento("1","123","movimiento","http:..","cool","CR","SJ","P","C","D","Del palo de limón, tres cuadras norte :v"))
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
    value: function crearGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2) {
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
    key: "modificarMiembro",
    value: function modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo) {
      var gMiembros = this.movimientos.get(idMovimiento).gMiembros;
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
      if (this.movimientos.has(idMovimiento)) {
        return this.movimientos.get(idMovimiento).gNodos.consultarRamas(idZona);
      } else {
        throw {
          message: "Movimiento no existe"
        };
      }
    }
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
    key: "getMiembro",
    value: function getMiembro(idMovimiento, idMiembro) {
      if (this.movimientos.has(idMovimiento)) {
        var miembro = this.movimientos.get(idMovimiento).gMiembros.getMiembro(idMiembro);

        if (miembro) {
          return miembro;
        } else {
          throw {
            message: "No existe ningún miembro con esa cedula"
          };
        }
      } else {
        throw {
          message: "Movimiento no existe"
        };
      }
    }
  }, {
    key: "getZona",
    value: function getZona(idMovimiento, idZona) {
      var zona = this.movimientos.get(idMovimiento).gNodos.getZona(idZona);

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
      var rama = this.movimientos.get(idMovimiento).gNodos.getRama(idZona, idRama);

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
      var grupo = this.movimientos.get(idMovimiento).gNodos.getGrupo(idZona, idRama, idGrupo);

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