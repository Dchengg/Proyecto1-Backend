"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var _require = require("express"),
    response = _require.response;

var _require2 = require("pg"),
    Client = _require2.Client;

var connection = {
  user: "gvfxwlqsgejzba",
  password: "4ad285c652c6e4af1a8e6c60657c1de874ffcc18974353c0645f6442ef6c2e02",
  database: "d30peii9ouik3l",
  host: "ec2-34-233-186-251.compute-1.amazonaws.com",
  port: 5432,
  ssl: true
}; //export default class DAO{ ??

var DAO = /*#__PURE__*/function () {
  function DAO() {
    (0, _classCallCheck2["default"])(this, DAO);
    this.client = new Client(connection);

    try {
      this.client.connect();
    } catch (err) {
      console.log(err);
    }
  }

  (0, _createClass2["default"])(DAO, [{
    key: "getMovimiento",
    value: function getMovimiento(id) {
      var _this = this;

      this.client.query("select * from Movimiento where cedula_juridica = '".concat(id, "'")).then(function (res) {
        console.table(res.rows);

        _this.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this.client.end();
      });
    }
  }, {
    key: "getMovimientoXAsesor",
    value: function getMovimientoXAsesor(id_asesor) {
      return this.client.query("select * from Movimiento where id_asesor = '".concat(id_asesor, "'")).then(function (res) {
        return res.rows;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "getTelefonoMovimiento",
    value: function () {
      var _getTelefonoMovimiento = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(idMovimiento) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.client.query("select * from Telefonos where cedula_movimiento = '" + idMovimiento + "'").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  console.log(err);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTelefonoMovimiento(_x) {
        return _getTelefonoMovimiento.apply(this, arguments);
      }

      return getTelefonoMovimiento;
    }()
  }, {
    key: "getZonas",
    value: function getZonas() {
      var _this2 = this;

      return this.client.query("select * from Zona ").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this2.client.end();
      });
    }
  }, {
    key: "getZonaXMovimiento",
    value: function getZonaXMovimiento(idMovimiento) {
      var _this3 = this;

      return this.client.query("Select * from getZonas('" + idMovimiento + "')").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this3.client.end();
      });
    }
  }, {
    key: "getZona",
    value: function getZona(idZona) {
      var _this4 = this;

      this.client.query("select * from Zona where id_zona = ''" + idZona).then(function (res) {
        console.table(res.rows);

        _this4.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this4.client.end();
      });
    }
  }, {
    key: "getRamas",
    value: function getRamas() {
      var _this5 = this;

      this.client.query("select * from Rama").then(function (res) {
        console.table(res.rows);

        _this5.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this5.client.end();
      });
    }
  }, {
    key: "getRama",
    value: function getRama(idRama) {
      var _this6 = this;

      this.client.query("select * from Rama where id_rama = " + idRama).then(function (res) {
        console.table(res.rows);

        _this6.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this6.client.end();
      });
    }
  }, {
    key: "getRamaXZona",
    value: function getRamaXZona(idZona) {
      var _this7 = this;

      this.client.query("select * from Rama where id_zona = " + idZona).then(function (res) {
        console.table(res.rows);

        _this7.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this7.client.end();
      });
    }
  }, {
    key: "getRamaXMovimiento",
    value: function getRamaXMovimiento(idMovimiento) {
      var _this8 = this;

      //return this.client.query(`select * from Rama where Rama.id_movimiento = '${idMovimiento}'`)
      return this.client.query("select * from getRamas('" + idMovimiento + "')").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this8.client.end();
      });
    }
  }, {
    key: "getGrupo",
    value: function getGrupo(idGrupo) {
      var _this9 = this;

      this.client.query("select * from Grupo where id_grupo = " + idGrupo).then(function (res) {
        console.table(res.rows);

        _this9.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this9.client.end();
      });
    }
  }, {
    key: "getGrupos",
    value: function getGrupos() {
      var _this10 = this;

      this.client.query("select * from Grupo").then(function (res) {
        console.table(res.rows);

        _this10.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this10.client.end();
      });
    }
  }, {
    key: "getGrupoXRama",
    value: function getGrupoXRama(idRama) {
      var _this11 = this;

      return this.client.query("select * from Grupo where id_rama = ''".concat(idRama)).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this11.client.end();
      });
    }
  }, {
    key: "getGrupoXMovimiento",
    value: function getGrupoXMovimiento(idMovimiento) {
      var _this12 = this;

      return this.client.query("Select * from getGrupos('" + idMovimiento + "')").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this12.client.end();
      });
    }
  }, {
    key: "getGrupoMiembros",
    value: function getGrupoMiembros(idGrupo, idMovimiento) {
      var _this13 = this;

      this.client.query("select * from GrupoMiembros where id_grupo = " + idGrupo + " AND id_movimiento='" + idMovimiento + "'").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this13.client.end();
      });
    }
  }, {
    key: "getGrupoMiembrosRol",
    value: function getGrupoMiembrosRol() {
      var _this14 = this;

      this.client.query("select * from GrupoMiembrosRol").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this14.client.end();
      });
    }
  }, {
    key: "getGruposMiembroxMiembro",
    value: function getGruposMiembroxMiembro(idMiembro, idMovimiento) {
      var _this15 = this;

      //Grupos donde esta y el rol
      this.client.query("select * from GrupoMiembros inner join GrupoMiembrosRol on GrupoMiembros.id_lider = GrupoMiembrosRol.id_lider where GrupoMiembros.id_miembro='" + idMiembro + "' AND GrupoMiembros.id_movimiento = '" + idMovimiento + "'").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this15.client.end();
      });
    }
  }, {
    key: "getMiembros",
    value: function getMiembros() {
      var _this16 = this;

      this.client.query("select * from Miembro").then(function (res) {
        console.table(res.rows);

        _this16.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this16.client.end();
      });
    }
    /*
        getMiembro(idMovimiento,idMiembro){
            this.client.query("select * from getMiembro('"+idMovimiento+"', '"+idMiembro+"')")
                .then(res => {
                    console.table(res.rows);
                    return res.rows;
                })
                .catch(err => {
                    console.log(err)
                    this.client.end()
                })
        }
    */

  }, {
    key: "getMiembroXMovimiento",
    value: function getMiembroXMovimiento(idMovimiento) {
      var _this17 = this;

      return this.client.query("select * from GrupoMiembros inner join Miembro on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_movimiento = '" + idMovimiento + "'").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this17.client.end();
      });
    }
  }, {
    key: "getAsesor",
    value: function getAsesor(idAsesor) {
      return this.client.query("select * from Asesor where cedula = '" + idAsesor + "'").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        throw err;
      });
    }
  }, {
    key: "loginAsesor",
    value: function loginAsesor(pCedula, pContrasena) {
      return this.client.query("select * from verificarContrasenaAsesor('".concat(pCedula, "','").concat(pContrasena, "')")).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "insertarGrupo",
    value: function () {
      var _insertarGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(idMovimiento, idZona, idRama, idGrupo, bMonitores, pNombre, idMonitor1, idMonitor2) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!idMonitor2) {
                  idMonitor2 = "";
                }

                return _context2.abrupt("return", this.client.query("select * from insertarGrupo('" + idMovimiento + "', " + idZona + ", " + idRama + ", '" + idGrupo + "', " + bMonitores + ", '" + pNombre + "','" + idMonitor1 + "','" + idMonitor2 + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function insertarGrupo(_x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
        return _insertarGrupo.apply(this, arguments);
      }

      return insertarGrupo;
    }()
  }, {
    key: "insertarRama",
    value: function () {
      var _insertarRama = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(pIdMovimiento, pIdZona, pNombre) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log(pNombre);
                return _context3.abrupt("return", this.client.query("select * from insertarRama('" + pIdMovimiento + "', " + pIdZona + ", '" + pNombre + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  console.log(err);
                  throw err;
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function insertarRama(_x10, _x11, _x12) {
        return _insertarRama.apply(this, arguments);
      }

      return insertarRama;
    }()
  }, {
    key: "insertarZona",
    value: function () {
      var _insertarZona = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(pIdMovimiento, pNombre) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.client.query("select * from insertarZona('" + pIdMovimiento + "', '" + pNombre + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function insertarZona(_x13, _x14) {
        return _insertarZona.apply(this, arguments);
      }

      return insertarZona;
    }()
  }, {
    key: "insertarMiembro",
    value: function () {
      var _insertarMiembro = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(pIdMovimiento, pCedula, pNombre, pCelular, pEmail, pProvincia, pCanton, pDistrito, pSenas, pPosibleMonitor) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.client.query("select * from insertarMiembro('" + pIdMovimiento + "', '" + pCedula + "', '" + pNombre + "', '" + pCelular + "', '" + pEmail + "', '" + pProvincia + "', '" + pCanton + "', '" + pDistrito + "', '" + pSenas + "' , " + pPosibleMonitor + ")").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function insertarMiembro(_x15, _x16, _x17, _x18, _x19, _x20, _x21, _x22, _x23, _x24) {
        return _insertarMiembro.apply(this, arguments);
      }

      return insertarMiembro;
    }()
  }, {
    key: "insertarMiembroAGrupo",
    value: function () {
      var _insertarMiembroAGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(idGrupo, cedula, idRama, idZona, idMovimiento) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.client.query("select * from insertarMiembroAGrupo('" + cedula + "', '" + idGrupo + "', " + idRama + ", " + idZona + ", '" + idMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function insertarMiembroAGrupo(_x25, _x26, _x27, _x28, _x29) {
        return _insertarMiembroAGrupo.apply(this, arguments);
      }

      return insertarMiembroAGrupo;
    }()
  }, {
    key: "cambiarMiembroDeGrupo",
    value: function () {
      var _cambiarMiembroDeGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(idMiembro, idRama, idGrupoNuevo, idMovimiento, idZona) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.client.query("select * from cambiarMiembroGrupo('" + idMiembro + "', " + idGrupoNuevo + ", " + idRama + ", " + idZona + ", '" + idMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function cambiarMiembroDeGrupo(_x30, _x31, _x32, _x33, _x34) {
        return _cambiarMiembroDeGrupo.apply(this, arguments);
      }

      return cambiarMiembroDeGrupo;
    }()
  }, {
    key: "getMiembrosXGrupo",
    value: function () {
      var _getMiembrosXGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(idGrupo, idMovimiento) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this.client.query("select * from Miembro inner join GrupoMiembros on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_grupo = " + idGrupo + " AND GrupoMiembros.id_movimiento = '" + idMovimiento + "'").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getMiembrosXGrupo(_x35, _x36) {
        return _getMiembrosXGrupo.apply(this, arguments);
      }

      return getMiembrosXGrupo;
    }()
  }, {
    key: "asignarJefeGrupo",
    value: function () {
      var _asignarJefeGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(cedulaMiembro, idZona, idRama, idGrupo, idMovimiento) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this.client.query("select * from asignarJefeGrupo('" + cedulaMiembro + "', " + idGrupo + ", " + idRama + ", " + idZona + ", '" + idMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function asignarJefeGrupo(_x37, _x38, _x39, _x40, _x41) {
        return _asignarJefeGrupo.apply(this, arguments);
      }

      return asignarJefeGrupo;
    }()
  }, {
    key: "asignarJefeRama",
    value: function () {
      var _asignarJefeRama = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(cedulaMiembro, idZona, idRama, idMovimiento) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", this.client.query("select * from asignarJefeRama('" + cedulaMiembro + "', " + idRama + ", " + idZona + ", '" + idMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function asignarJefeRama(_x42, _x43, _x44, _x45) {
        return _asignarJefeRama.apply(this, arguments);
      }

      return asignarJefeRama;
    }()
  }, {
    key: "asignarJefeZona",
    value: function () {
      var _asignarJefeZona = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(cedulaMiembro, idZona, idMovimiento) {
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this.client.query("select * from asignarJefeZona('" + cedulaMiembro + "', " + idZona + ", '" + idMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function asignarJefeZona(_x46, _x47, _x48) {
        return _asignarJefeZona.apply(this, arguments);
      }

      return asignarJefeZona;
    }()
  }, {
    key: "getGruposXMiembro",
    value: function () {
      var _getGruposXMiembro = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(idMiembro, idMovimiento) {
        var quer, quer2, quer3, quer4, quer5;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                quer = "select * from GrupoMiembros ";
                quer2 = quer + "inner join GrupoMiembrosRol on GrupoMiembros.id_lider = GrupoMiembrosRol.id_lider ";
                quer3 = quer2 + "inner join Grupo on (GrupoMiembros.id_movimiento=Grupo.id_movimiento AND GrupoMiembros.id_zona=Grupo.id_zona ";
                quer4 = quer3 + "AND GrupoMiembros.id_rama=Grupo.id_rama AND GrupoMiembros.id_grupo=Grupo.id_grupo)";
                quer5 = quer4 + "where GrupoMiembros.id_movimiento='" + idMovimiento + "' AND GrupoMiembros.id_miembro='";
                return _context12.abrupt("return", this.client.query(quer5 + idMiembro + "'").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getGruposXMiembro(_x49, _x50) {
        return _getGruposXMiembro.apply(this, arguments);
      }

      return getGruposXMiembro;
    }()
  }, {
    key: "cambioMiembroGrupo",
    value: function () {
      var _cambioMiembroGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(pCedula, pIdGrupoViejo, pIdGrupoNuevo, pIdRama, pIdZona, pIdMovimiento) {
        var quer;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                quer = "select * from cambiarmiembrogrupo ('" + pCedula + "','" + pIdGrupoViejo + "','" + pIdGrupoNuevo + "'," + pIdRama + "," + pIdZona + ",'" + pIdMovimiento + "')";
                return _context13.abrupt("return", this.client.query(quer).then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function cambioMiembroGrupo(_x51, _x52, _x53, _x54, _x55, _x56) {
        return _cambioMiembroGrupo.apply(this, arguments);
      }

      return cambioMiembroGrupo;
    }()
  }, {
    key: "getAllGrupoMiembros",
    value: function () {
      var _getAllGrupoMiembros = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
        var quer;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                quer = "select * from GrupoMiembros";
                return _context14.abrupt("return", this.client.query(quer).then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function getAllGrupoMiembros() {
        return _getAllGrupoMiembros.apply(this, arguments);
      }

      return getAllGrupoMiembros;
    }()
  }, {
    key: "eliminarJefeGrupo",
    value: function () {
      var _eliminarJefeGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(pCedula, pIdZona, pIdRama, pIdGrupo, pIdMovimiento) {
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                return _context15.abrupt("return", this.client.query("select * from eliminarjefegrupo('" + pCedula + "', " + pIdGrupo + ", " + pIdRama + ", " + pIdZona + ", '" + pIdMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function eliminarJefeGrupo(_x57, _x58, _x59, _x60, _x61) {
        return _eliminarJefeGrupo.apply(this, arguments);
      }

      return eliminarJefeGrupo;
    }()
  }, {
    key: "eliminarJefeRama",
    value: function () {
      var _eliminarJefeRama = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(pCedula, pIdZona, pIdRama, pIdMovimiento) {
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", this.client.query("select * from eliminarjeferama('" + pCedula + "', " + pIdRama + ", " + pIdZona + ", '" + pIdMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function eliminarJefeRama(_x62, _x63, _x64, _x65) {
        return _eliminarJefeRama.apply(this, arguments);
      }

      return eliminarJefeRama;
    }()
  }, {
    key: "eliminarJefeZona",
    value: function () {
      var _eliminarJefeZona = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(pCedula, pIdZona, pIdMovimiento) {
        var res;
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.prev = 0;
                _context17.next = 3;
                return this.client.query("select * from eliminarjefezona('" + pCedula + "', " + pIdZona + ", '" + pIdMovimiento + "')");

              case 3:
                res = _context17.sent;
                console.table(res.rows);
                return _context17.abrupt("return", res.rows);

              case 8:
                _context17.prev = 8;
                _context17.t0 = _context17["catch"](0);
                throw _context17.t0;

              case 11:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[0, 8]]);
      }));

      function eliminarJefeZona(_x66, _x67, _x68) {
        return _eliminarJefeZona.apply(this, arguments);
      }

      return eliminarJefeZona;
    }()
  }, {
    key: "eliminarDeGrupo",
    value: function () {
      var _eliminarDeGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(pCedula, pIdGrupo, pIdRama, pIdZona, pIdMovimiento) {
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                return _context18.abrupt("return", this.client.query("select * from eliminardegrupo('" + pCedula + "', " + pIdGrupo + ", " + pIdRama + ", " + pIdZona + ", '" + pIdMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function eliminarDeGrupo(_x69, _x70, _x71, _x72, _x73) {
        return _eliminarDeGrupo.apply(this, arguments);
      }

      return eliminarDeGrupo;
    }()
  }, {
    key: "modificarMovimiento",
    value: function () {
      var _modificarMovimiento = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(pIdMovimiento, pNombre, pPais, pProvincia, pCanton, pDistrito, pSenales, pDireccionWeb, pLogo, pTelefonos) {
        var queryPT1, queryPT2;
        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                //TELEFONOS, EN PLURAL, ES UNA LISTA
                //La lista que recibe el DAO va asi: [elem1,elem2]
                queryPT1 = "select * from modificarMovimiento('" + pIdMovimiento + "', '" + pNombre + "', '" + pPais + "', '" + pProvincia + "', '" + pCanton + "', '";
                queryPT2 = pDistrito + "', '" + pSenales + "', '" + pDireccionWeb + "', '" + pLogo + "', ARRAY[" + pTelefonos + "])";
                console.log(queryPT1 + queryPT2);
                return _context19.abrupt("return", this.client.query(queryPT1 + queryPT2).then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function modificarMovimiento(_x74, _x75, _x76, _x77, _x78, _x79, _x80, _x81, _x82, _x83) {
        return _modificarMovimiento.apply(this, arguments);
      }

      return modificarMovimiento;
    }()
  }, {
    key: "modificarZona",
    value: function () {
      var _modificarZona = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(pIdMovimiento, pIdZona, pNombre) {
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                return _context20.abrupt("return", this.client.query("select * from editarzona('" + pIdMovimiento + "', " + pIdZona + ", '" + pNombre + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function modificarZona(_x84, _x85, _x86) {
        return _modificarZona.apply(this, arguments);
      }

      return modificarZona;
    }()
  }, {
    key: "modificarRama",
    value: function () {
      var _modificarRama = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(pIdMovimiento, pIdZona, pIdRama, pNombre) {
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                return _context21.abrupt("return", this.client.query("select * from editarrama('" + pIdMovimiento + "', " + pIdZona + ", " + pIdRama + ", '" + pNombre + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function modificarRama(_x87, _x88, _x89, _x90) {
        return _modificarRama.apply(this, arguments);
      }

      return modificarRama;
    }()
  }, {
    key: "modificarGrupo",
    value: function () {
      var _modificarGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(pIdMovimiento, pIdZona, pIdRama, pIdGrupo, pB_Monitores, pNombre) {
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                return _context22.abrupt("return", this.client.query("select * from editargrupo('" + pIdMovimiento + "', " + pIdZona + ", " + pIdRama + ", " + pIdGrupo + ", " + pB_Monitores + ", '" + pNombre + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function modificarGrupo(_x91, _x92, _x93, _x94, _x95, _x96) {
        return _modificarGrupo.apply(this, arguments);
      }

      return modificarGrupo;
    }()
  }, {
    key: "modificarMiembro",
    value: function () {
      var _modificarMiembro = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(pIdMovimiento, pCedula, pNombre, pCelular, pEmail, pProvincia, pCanton, pDistrito, pSenas, pBMonitor) {
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                return _context23.abrupt("return", this.client.query("select * from editarMiembro('" + pIdMovimiento + "', '" + pCedula + "', '" + pNombre + "', '" + pCelular + "', '" + pEmail + "', '" + pProvincia + "', '" + pCanton + "', '" + pDistrito + "', '" + pSenas + "', " + pBMonitor + ")").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function modificarMiembro(_x97, _x98, _x99, _x100, _x101, _x102, _x103, _x104, _x105, _x106) {
        return _modificarMiembro.apply(this, arguments);
      }

      return modificarMiembro;
    }()
  }, {
    key: "monitoresProbables",
    value: function () {
      var _monitoresProbables = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(pIdMovimiento, pIdZona, pIdRama, pIdGrupo) {
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                return _context24.abrupt("return", this.client.query("select * from monitoresprobables('" + pIdMovimiento + "', " + pIdZona + ", " + pIdRama + ", " + pIdGrupo + ")").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function monitoresProbables(_x107, _x108, _x109, _x110) {
        return _monitoresProbables.apply(this, arguments);
      }

      return monitoresProbables;
    }()
  }, {
    key: "asignarMonitorGrupo",
    value: function () {
      var _asignarMonitorGrupo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(pCedula, pIdZona, pIdRama, pIdGrupo, pIdMovimiento) {
        return _regenerator["default"].wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                return _context25.abrupt("return", this.client.query("select * from asignarMonitorGrupo('" + pCedula + "', " + pIdGrupo + ", " + pIdRama + ", " + pIdZona + ", '" + pIdMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function asignarMonitorGrupo(_x111, _x112, _x113, _x114, _x115) {
        return _asignarMonitorGrupo.apply(this, arguments);
      }

      return asignarMonitorGrupo;
    }()
  }, {
    key: "otrasRamas",
    value: function () {
      var _otrasRamas = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(pCedula, pIdMovimiento) {
        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                return _context26.abrupt("return", this.client.query("select * from otrasRamas('" + pCedula + "', '" + pIdMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function otrasRamas(_x116, _x117) {
        return _otrasRamas.apply(this, arguments);
      }

      return otrasRamas;
    }()
  }, {
    key: "todosLosMonitores",
    value: function () {
      var _todosLosMonitores = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(idMovimiento, idZona) {
        return _regenerator["default"].wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                return _context27.abrupt("return", this.client.query("select * from todoslosmonitores('" + idMovimiento + "', " + idZona + ")").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function todosLosMonitores(_x118, _x119) {
        return _todosLosMonitores.apply(this, arguments);
      }

      return todosLosMonitores;
    }()
  }, {
    key: "ramasDeMiembros",
    value: function () {
      var _ramasDeMiembros = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(pCedula, pIdMovimiento) {
        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                return _context28.abrupt("return", this.client.query("select * from ramasDeMiembro('" + pCedula + "', '" + pIdMovimiento + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function ramasDeMiembros(_x120, _x121) {
        return _ramasDeMiembros.apply(this, arguments);
      }

      return ramasDeMiembros;
    }()
  }, {
    key: "grupoDeMiembroEnRama",
    value: function () {
      var _grupoDeMiembroEnRama = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(pIdMovimiento, pIdZona, pIdRama, pCedula) {
        return _regenerator["default"].wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                return _context29.abrupt("return", this.client.query("select * from grupoDeMiembroEnRama('" + pIdMovimiento + "', " + pIdZona + ", " + pIdRama + ", '" + pCedula + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function grupoDeMiembroEnRama(_x122, _x123, _x124, _x125) {
        return _grupoDeMiembroEnRama.apply(this, arguments);
      }

      return grupoDeMiembroEnRama;
    }()
  }, {
    key: "agregarAsesor",
    value: function () {
      var _agregarAsesor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(pCanton, pCedula, pCelular, pContrasena, pDistrito, pNombre, pProvincia, pSenales, pEmail) {
        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                return _context30.abrupt("return", this.client.query("select * from agregarAsesor('" + pCanton + "', '" + pCedula + "', '" + pCelular + "', '" + pContrasena + "', '" + pDistrito + "', '" + pNombre + "', '" + pProvincia + "', '" + pSenales + "', '" + pEmail + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function agregarAsesor(_x126, _x127, _x128, _x129, _x130, _x131, _x132, _x133, _x134) {
        return _agregarAsesor.apply(this, arguments);
      }

      return agregarAsesor;
    }()
  }, {
    key: "eliminarAsesor",
    value: function () {
      var _eliminarAsesor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(pCedula) {
        return _regenerator["default"].wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                return _context31.abrupt("return", this.client.query("select * from eliminarAsesor('" + pCedula + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function eliminarAsesor(_x135) {
        return _eliminarAsesor.apply(this, arguments);
      }

      return eliminarAsesor;
    }()
  }, {
    key: "editarAsesor",
    value: function () {
      var _editarAsesor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32(pCanton, pCedula, pCelular, pContrasena, pDistrito, pNombre, pProvincia, pSenales, pEmail) {
        return _regenerator["default"].wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                return _context32.abrupt("return", this.client.query("select * from editarAsesor('" + pCanton + "', '" + pCedula + "', '" + pCelular + "', '" + pContrasena + "', '" + pDistrito + "', '" + pNombre + "', '" + pProvincia + "', '" + pSenales + "', '" + pEmail + "')").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function editarAsesor(_x136, _x137, _x138, _x139, _x140, _x141, _x142, _x143, _x144) {
        return _editarAsesor.apply(this, arguments);
      }

      return editarAsesor;
    }()
  }, {
    key: "crearMovimiento",
    value: function () {
      var _crearMovimiento = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33(pCanton, pCedulaJuridica, pIdAsesor, pLogo, pDireccionWeb, pDistrito, pNombre, pProvincia, pPais, pSenales, pTelefonos) {
        return _regenerator["default"].wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                return _context33.abrupt("return", this.client.query("select * from crearMovimiento('" + pCanton + "', '" + pCedulaJuridica + "', '" + pIdAsesor + "', '" + pLogo + "', '" + pDireccionWeb + "', '" + pDistrito + "', '" + pNombre + "', '" + pProvincia + "', '" + pPais + "', '" + pSenales + "', ARRAY[" + pTelefonos + "])").then(function (res) {
                  console.table(res.rows);
                  return res.rows;
                })["catch"](function (err) {
                  throw err;
                }));

              case 1:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      function crearMovimiento(_x145, _x146, _x147, _x148, _x149, _x150, _x151, _x152, _x153, _x154, _x155) {
        return _crearMovimiento.apply(this, arguments);
      }

      return crearMovimiento;
    }()
  }]);
  return DAO;
}();

exports["default"] = DAO;