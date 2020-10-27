"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Nodo = _interopRequireDefault(require("../Modelo/Nodo"));

var GestorNodos = /*#__PURE__*/function () {
  function GestorNodos() {
    (0, _classCallCheck2["default"])(this, GestorNodos);
    this.zonas = new Map();
  }

  (0, _createClass2["default"])(GestorNodos, [{
    key: "crearZona",
    value: function crearZona(idZona, nombre) {
      if (this.zonas.has(idZona)) {
        throw {
          message: "Ya hay una zona con ese id"
        };
      }

      this.zonas.set(idZona, new _Nodo["default"](idZona, nombre));
    }
  }, {
    key: "crearRama",
    value: function crearRama(idZona, idRama, nombre) {
      var zona = this.getZona(idZona);
      zona.agregar(new _Nodo["default"](idRama, nombre));
    }
  }, {
    key: "agregarMiembro",
    value: function agregarMiembro(idZona, idRama, idGrupo, miembro) {
      var grupo = this.getGrupo(idZona, idRama, idGrupo);
      grupo.agregar(miembro);
    }
  }, {
    key: "crearGrupo",
    value: function crearGrupo(idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2) {
      var rama = this.getRama(idZona, idRama);
      rama.agregar(new _Nodo["default"](idGrupo, nombre, idEncargado1, idEncargado2, false));
    }
  }, {
    key: "consultarRamas",
    value: function consultarRamas(idZona) {
      var zona = this.getZona(idZona);
      return zona.composites;
    }
  }, {
    key: "consultarGrupos",
    value: function consultarGrupos(idZona, idRama) {
      var rama = this.getRama(idZona, idRama);
      return rama.composites;
    }
  }, {
    key: "consultarMiembrosGrupo",
    value: function consultarMiembrosGrupo(idZona, idRama, idGrupo) {
      var grupo = this.getGrupo(idZona, idRama, idGrupo);
      return grupo.composites;
    }
  }, {
    key: "getZona",
    value: function getZona(idZona) {
      var zona = this.zonas.get(idZona);
      if (zona == null) throw {
        message: "No existe la zona consultada " + idZona
      };
      return zona;
    }
  }, {
    key: "getRama",
    value: function getRama(idZona, idRama) {
      var zona = this.getZona(idZona);
      var rama = zona.buscar(idRama);
      if (rama == null) throw {
        message: "No existe la rama consultada"
      };
      return rama;
    }
  }, {
    key: "getGrupo",
    value: function getGrupo(idZona, idRama, idGrupo) {
      var rama = this.getRama(idZona, idRama);
      var grupo = rama.buscar(idGrupo);
      if (grupo == null) throw {
        message: "No existe el grupo consultado"
      };
      return grupo;
    }
  }]);
  return GestorNodos;
}();

exports["default"] = GestorNodos;