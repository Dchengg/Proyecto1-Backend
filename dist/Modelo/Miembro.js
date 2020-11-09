"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _Component2 = _interopRequireDefault(require("./Component"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Miembro = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(Miembro, _Component);

  var _super = _createSuper(Miembro);

  function Miembro(id, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor) {
    var _this;

    (0, _classCallCheck2["default"])(this, Miembro);
    _this = _super.call(this, id, nombre);
    _this.celular = celular;
    _this.email = email;
    _this.provincia = provincia;
    _this.canton = canton;
    _this.distrito = distrito;
    _this.senas = senas;
    _this.posible_monitor = posible_monitor;
    return _this;
  }

  return Miembro;
}(_Component2["default"]);

exports["default"] = Miembro;