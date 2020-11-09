"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Component = function Component(id, nombre) {
  (0, _classCallCheck2["default"])(this, Component);

  if (this.constructor == Component) {
    throw new Error("Can't instantiate abstract class (Component)!");
  }

  this.id = id;
  this.nombre = nombre;
};

exports["default"] = Component;