process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const { response } = require("express");
const {Client} = require("pg");

const connection = {
    user: "gvfxwlqsgejzba",
    password: "4ad285c652c6e4af1a8e6c60657c1de874ffcc18974353c0645f6442ef6c2e02",
    database: "d30peii9ouik3l",
    host: "ec2-34-233-186-251.compute-1.amazonaws.com",
    port: 5432,
    ssl: true
};

class DAO{
    constructor(){
        this.client = new Client(connection);
        try{
            this.client.connect();
        }catch(err){
            console.log(err)
        }
    }

    getMovimiento(id){
        this.client.query("select * from Movimiento where cedula_juridica = "+id)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getMovimientoXAsesor(id_asesor){
        this.client.query("select * from Movimiento where id_asesor = "+id_asesor)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getTelefonoMovimiento(idMoviemiento){
        this.client.query("select * from Telefonos where cedula_movimiento = "+idMoviemiento)
        .then(res => {
            console.table(res.rows)
            this.client.end()
            return res.rows;
        })
        .catch(err => {
            console.log(err)
            this.client.end()
        })
    }

    getZonaXMovimiento(idMovimiento){
        this.client.query("select * from Zona where id_movimiento = "+idMovimiento)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getZona(idZona){
        this.client.query("select * from Zona where id_zona = "+idZona)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getRamas(){
        this.client.query("select * from Rama")
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }
    

    getRama(idRama){
        this.client.query("select * from Rama where id_rama = "+idRama)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }
    
    getRamaXZona(idZona){
        this.client.query("select * from Rama where id_zona = "+idZona)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getRamaXMovimiento(idMovimiento){
        this.client.query("select * from Rama where id_movimiento = "+idMovimiento)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getGrupo(idGrupo){
        this.client.query("select * from Grupo where id_grupo = "+idGrupo)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getGrupoXRama(idRama){
        this.client.query("select * from Grupo where id_rama = "+idRama)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getGrupoXMovimiento(idMovimiento){
        this.client.query("select * from Grupo where id_movimiento = "+idMovimiento)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getGrupoMiembros(idGrupo){
        this.client.query("select * from GrupoMiembros where id_grupo = "+idGrupo)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getGrupoMiembrosRol(){
        this.client.query("select * from GrupoMiembrosRol")
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getGruposMiembroxMiembro(idMiembro){
        //Grupos donde esta y el rol
        this.client.query("select * from GrupoMiembros inner join GrupoMiembrosRol on GrupoMiembros.id_lider = GrupoMiembrosRol.id_lider where id_miembro="+idMiembro)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getMiembros(){
        //this.client.query("call procedure storedProcedure()")
        this.client.query("select * from Miembro")
            .then(res => {
                console.table(res.rows);
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getMiembro(idMiembro){
        this.client.query("select * from Miembro where cedula = "+idMiembro)
            .then(res => {
                console.table(res.rows);
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getMiembroXMovimiento(idMovimiento){
        this.client.query("select * from Miembro inner join GrupoMiembros on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_movimiento = "+idMovimiento)
            .then(res => {
                console.table(res.rows)
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getAsesor(){
        this.client.query("select * from Asesor")
            .then(res => {
                console.table(res.rows);
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    loginAsesor(pCedula,pContrasena){
        //this.client.query("select * from Asesor")
        this.client.query("select * from verificarContrasenaAsesor("+pCedula+","+pContrasena+")")
            .then(res => {
                console.table(res.rows);
                this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }
}
const dao=new DAO();
dao.getMiembroXMovimiento("'4000042145'");
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