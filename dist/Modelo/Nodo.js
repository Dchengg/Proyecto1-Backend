"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Component2 = _interopRequireDefault(require("./Component"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Nodo = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Nodo, _Component);

  var _super = _createSuper(Nodo);

  function Nodo(id, nombre, encargado1, encargado2, isMonitor) {
    var _this;

    (0, _classCallCheck2["default"])(this, Nodo);
    _this = _super.call(this, id, nombre);
    _this.composites = new Map();

    if (encargado1) {
      _this.encargado1 = encargado1;
    }

    if (encargado2) {
      _this.encargado2 = encargado2;
    }

    _this.isMonitor = isMonitor;
    return _this;
  }

  (0, _createClass2["default"])(Nodo, [{
    key: "agregar",
    value: function agregar(registro) {
      if (this.composites.has(registro.id)) {
        throw {
          message: "Ya existe un nodo con la identificación " + registro.id
        };
      }

      this.composites.set(registro.id, registro);
    }
  }, {
    key: "eliminar",
    value: function eliminar(llave) {
      this.composites["delete"](llave);
    }
  }, {
    key: "buscar",
    value: function buscar(llave) {
      var nodo = this.composites.get(llave);
      return nodo;
    }
  }, {
    key: "asignarEncargados",
    value: function asignarEncargados(miembro, miembro2, isMonitor) {
      if (miembro) {
        this.encargado1 = miembro;
      }

      if (miembro2) {
        this.encargado2 = miembro2;
      }

      this.isMonitor = isMonitor;
    }
  }, {
    key: "setEncargado1",
    value: function setEncargado1(idEncargado1) {
      this.encargado1 = idEncargado1;
    }
  }, {
    key: "setEncargado2",
    value: function setEncargado2(idEncargado2) {
      this.encargado2 = idEncargado2;
    }
  }]);
  return Nodo;
}(_Component2["default"]);

exports["default"] = Nodo;