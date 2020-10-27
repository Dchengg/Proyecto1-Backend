"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
};

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
    value: function getTelefonoMovimiento(idMoviemiento) {
      this.client.query("select * from Telefonos where cedula_movimiento = " + idMoviemiento).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "getZonaXMovimiento",
    value: function getZonaXMovimiento(idMovimiento) {
      var _this2 = this;

      return this.client.query("select * from Zona where id_movimiento = '".concat(idMovimiento, "'")).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this2.client.end();
      });
    }
  }, {
    key: "getZona",
    value: function getZona(idZona) {
      var _this3 = this;

      this.client.query("select * from Zona where id_zona = ''" + idZona).then(function (res) {
        console.table(res.rows);

        _this3.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this3.client.end();
      });
    }
  }, {
    key: "getRamas",
    value: function getRamas() {
      var _this4 = this;

      this.client.query("select * from Rama").then(function (res) {
        console.table(res.rows);

        _this4.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this4.client.end();
      });
    }
  }, {
    key: "getRama",
    value: function getRama(idRama) {
      var _this5 = this;

      this.client.query("select * from Rama where id_rama = " + idRama).then(function (res) {
        console.table(res.rows);

        _this5.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this5.client.end();
      });
    }
  }, {
    key: "getRamaXZona",
    value: function getRamaXZona(idZona) {
      var _this6 = this;

      this.client.query("select * from Rama where id_zona = " + idZona).then(function (res) {
        console.table(res.rows);

        _this6.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this6.client.end();
      });
    }
  }, {
    key: "getRamaXMovimiento",
    value: function getRamaXMovimiento(idMovimiento) {
      var _this7 = this;

      return this.client.query("select * from Rama where id_movimiento = '".concat(idMovimiento, "'")).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this7.client.end();
      });
    }
  }, {
    key: "getGrupo",
    value: function getGrupo(idGrupo) {
      var _this8 = this;

      this.client.query("select * from Grupo where id_grupo = " + idGrupo).then(function (res) {
        console.table(res.rows);

        _this8.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this8.client.end();
      });
    }
  }, {
    key: "getGrupoXRama",
    value: function getGrupoXRama(idRama) {
      var _this9 = this;

      return this.client.query("select * from Grupo where id_rama = ''".concat(idRama)).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this9.client.end();
      });
    }
  }, {
    key: "getGrupoXMovimiento",
    value: function getGrupoXMovimiento(idMovimiento) {
      var _this10 = this;

      var quer = "select * from Grupo inner join GrupoMiembros on GrupoMiembros.id_grupo=Grupo.id_grupo inner join GrupoMiembrosRol on GrupoMiembros.id_lider=GrupoMiembrosRol.id_lider where grupo.id_movimiento = '";
      return this.client.query(quer + idMovimiento + "' and (GrupoMiembros.id_lider = 1 or GrupoMiembros.id_lider = 2)").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this10.client.end();
      });
    }
  }, {
    key: "getGrupoMiembros",
    value: function getGrupoMiembros(idGrupo) {
      var _this11 = this;

      this.client.query("select * from GrupoMiembros where id_grupo = " + idGrupo).then(function (res) {
        console.table(res.rows);

        _this11.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this11.client.end();
      });
    }
  }, {
    key: "getGrupoMiembrosRol",
    value: function getGrupoMiembrosRol() {
      var _this12 = this;

      this.client.query("select * from GrupoMiembrosRol").then(function (res) {
        console.table(res.rows);

        _this12.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this12.client.end();
      });
    }
  }, {
    key: "getGruposMiembroxMiembro",
    value: function getGruposMiembroxMiembro(idMiembro) {
      var _this13 = this;

      //Grupos donde esta y el rol
      this.client.query("select * from GrupoMiembros inner join GrupoMiembrosRol on GrupoMiembros.id_lider = GrupoMiembrosRol.id_lider where id_miembro=" + idMiembro).then(function (res) {
        console.table(res.rows);

        _this13.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this13.client.end();
      });
    }
  }, {
    key: "getMiembros",
    value: function getMiembros() {
      var _this14 = this;

      //this.client.query("call procedure storedProcedure()")
      this.client.query("select * from Miembro").then(function (res) {
        console.table(res.rows);

        _this14.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this14.client.end();
      });
    }
  }, {
    key: "getMiembro",
    value: function getMiembro(idMiembro) {
      var _this15 = this;

      this.client.query("select * from Miembro where cedula = " + idMiembro).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this15.client.end();
      });
    }
  }, {
    key: "getMiembroXMovimiento",
    value: function getMiembroXMovimiento(idMovimiento) {
      var _this16 = this;

      return this.client.query("select * from Miembro inner join GrupoMiembros on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_movimiento = '".concat(idMovimiento, "'")).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this16.client.end();
      });
    }
  }, {
    key: "getAsesor",
    value: function getAsesor() {
      var _this17 = this;

      this.client.query("select * from Asesor").then(function (res) {
        console.table(res.rows);

        _this17.client.end();

        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this17.client.end();
      });
    }
  }, {
    key: "loginAsesor",
    value: function loginAsesor(pCedula, pContrasena) {
      //this.client.query("select * from Asesor")
      return this.client.query("select * from verificarContrasenaAsesor('".concat(pCedula, "','").concat(pContrasena, "')")).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "insertarRama",
    value: function insertarRama(pIdMovimiento, pIdZona, pNombre) {
      var _this18 = this;

      return this.client.query("select * from insertarRama('" + pIdMovimiento + "', " + pIdZona + ", '" + pNombre + "')").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this18.client.end();
      });
    }
  }, {
    key: "insertarZona",
    value: function insertarZona(pIdMovimiento, pIdNombre) {
      var _this19 = this;

      return this.client.query("select * from insertarZona('" + pIdMovimiento + "', '" + pIdNombre + "')").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this19.client.end();
      });
    }
  }, {
    key: "insertarMiembro",
    value: function insertarMiembro(pCedula, pNombre, pCelular, pEmail, pProvincia, pCanton, pDistrito, pSenas) {
      var _this20 = this;

      //AUN NO ESTA EN LA BASE
      return this.client.query("select * from insertarMiembro('" + pCedula + "', '" + pNombre + "', '" + pCelular + "', '" + pEmail + "', '" + pProvincia + "', '" + pCanton + "', '" + pDistrito + "', '" + pSenas + "')").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this20.client.end();
      });
    }
  }, {
    key: "insertarMiembroAGrupo",
    value: function insertarMiembroAGrupo(idGrupo, cedula, idRama, idZona, idMovimiento, idLider) {
      var _this21 = this;

      //AUN NO ESTA EN LA BASE
      return this.client.query("select * from insertarMiembroAGrupo('" + cedula + "', '" + idGrupo + "', " + idRama + ", " + idZona + ", '" + idMovimiento + "', " + idLider + ")").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this21.client.end();
      });
    }
  }, {
    key: "insertarGrupo",
    value: function insertarGrupo(idZona, idMonitor, idRama, idMonitor2) {
      var _this22 = this;

      //AUN NO ESTA EN BASE
      return this.client.query("select * from insertarGrupo(" + idZona + ", '" + idMonitor + "', " + idRama + ", '" + idMonitor2 + "')").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this22.client.end();
      });
    }
  }, {
    key: "insertarGrupo",
    value: function insertarGrupo(idZona, idMonitor, idRama) {
      var _this23 = this;

      //AUN NO ESTA EN BASE
      return this.client.query("select * from insertarGrupo(" + idZona + ", '" + idMonitor + "', " + idRama + ")").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this23.client.end();
      });
    }
  }, {
    key: "cambiarMiembroDeGrupo",
    value: function cambiarMiembroDeGrupo(idMiembro, idRama, idGrupoNuevo, idMovimiento, idZona) {
      var _this24 = this;

      //AUN NO ESTA EN BASE
      return this.client.query("select * from cambiarMiembroGrupo(" + idGrupoNuevo + ", '" + idMiembro + "', " + idRama + ", '" + idMovimiento + "', " + idZona + ")").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this24.client.end();
      });
    }
  }, {
    key: "getMiembrosXGrupo",
    value: function getMiembrosXGrupo(idGrupo) {
      var _this25 = this;

      return this.client.query("select * from Miembro inner join GrupoMiembros on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_grupo = " + idGrupo).then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this25.client.end();
      });
    }
  }, {
    key: "editarMiembro",
    value: function editarMiembro(pCedula, pNombre, pCelular, pEmail, pProvincia, pCanton, pDistrito, pSenas) {
      var _this26 = this;

      //AUN NO ESTA EN LA BASE
      return this.client.query("select * from editarMiembro('" + pCedula + "', '" + pNombre + "', '" + pCelular + "', '" + pEmail + "', '" + pProvincia + "', '" + pCanton + "', '" + pDistrito + "', '" + pSenas + "')").then(function (res) {
        console.table(res.rows);
        return res.rows;
      })["catch"](function (err) {
        console.log(err);

        _this26.client.end();
      });
    }
  }]);
  return DAO;
}();

exports["default"] = DAO;
var dao = new DAO(); //dao.getMiembroXMovimiento("'4000042145'");
//dao.loginAsesor("'117380721'","'Yoquese'");
//dao.getMovimientoXAsesor("'117380721'");
//dao.getAsesor();
//contrasena: 'Yoquese'
//cedula: '117380721'
//dao.getGrupoMiembrosRol();
//dao.getGruposMiembro("'117940925'");
//dao.getTelefonoMovimiento();
//dao.getGrupoMiembros();
//dao.getRamas();
//dao.getGrupo();
//dao.getAsesor();
//Movimiento: '4000042145'