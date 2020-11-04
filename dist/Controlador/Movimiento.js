"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _GestorMiembros = _interopRequireDefault(require("./GestorMiembros"));

var _GestorNodos = _interopRequireDefault(require("./GestorNodos"));

var Movimiento = function Movimiento(cedula, idAsesor, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas) {
  (0, _classCallCheck2["default"])(this, Movimiento);
  this.cedula_juridica = cedula;
  this.idAsesor = idAsesor;
  this.nombre = nombre;
  this.direccionWeb = direccionWeb;
  this.logo = logo;
  this.pais = pais;
  this.provincia = provincia;
  this.canton = canton;
  this.distrito = distrito;
  this.senas = senas;
  this.gMiembros = new _GestorMiembros["default"]();
  this.gNodos = new _GestorNodos["default"]();
};

exports["default"] = Movimiento;