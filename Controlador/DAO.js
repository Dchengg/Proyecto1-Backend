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
        this.client.query(`select * from Movimiento where cedula_juridica = '${id}'`)
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
        return this.client.query(`select * from Movimiento where id_asesor = '${id_asesor}'`)
            .then(res => {
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }

    getTelefonoMovimiento(idMoviemiento){
        this.client.query("select * from Telefonos where cedula_movimiento = "+idMoviemiento)
        .then(res => {
            console.table(res.rows)
            return res.rows;
        })
        .catch(err => {
            console.log(err)
        })
    }

    getZonaXMovimiento(idMovimiento){
        return this.client.query(`select * from Zona where id_movimiento = '${idMovimiento}'`)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getZona(idZona){
        this.client.query("select * from Zona where id_zona = ''"+idZona)
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
        return this.client.query(`select * from Rama where id_movimiento = '${idMovimiento}'`)
            .then(res => {
                console.table(res.rows)
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

    getGrupos(){
        this.client.query("select * from Grupo")
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
        return this.client.query(`select * from Grupo where id_rama = ''${idRama}`)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    
    getGrupoXMovimiento(idMovimiento){
        const quer="select * from Grupo inner join GrupoMiembros on GrupoMiembros.id_grupo=Grupo.id_grupo inner join GrupoMiembrosRol on GrupoMiembros.id_lider=GrupoMiembrosRol.id_lider where grupo.id_movimiento = '"
        return this.client.query(quer+idMovimiento+"' and GrupoMiembros.id_lider != 5")
            .then(res => {
                console.table(res.rows)
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
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getMiembroXMovimiento(idMovimiento){
        return this.client.query(`select * from GrupoMiembros inner join Miembro on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_movimiento = '${idMovimiento}'`)
            .then(res => {
                console.table(res.rows)
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
                //this.client.end()
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    loginAsesor(pCedula,pContrasena){
        //this.client.query("select * from Asesor")
        return this.client.query(`select * from verificarContrasenaAsesor('${pCedula}','${pContrasena}')`)
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }
    

    insertarRama(pIdMovimiento,pIdZona,pNombre){
        return this.client.query("select * from insertarRama('"+pIdMovimiento+"', "+pIdZona+", '"+pNombre+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    insertarZona(pIdMovimiento,pIdNombre){
        return this.client.query("select * from insertarZona('"+pIdMovimiento+"', '"+pIdNombre+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    insertarMiembro(pCedula,pNombre,pCelular,pEmail,pProvincia,pCanton,pDistrito,pSenas){
        //AUN NO ESTA EN LA BASE
        return this.client.query("select * from insertarMiembro('"+pCedula+"', '"+pNombre+"', '"+pCelular+"', '"+pEmail+"', '"+pProvincia+"', '"+pCanton+"', '"+pDistrito+"', '"+pSenas+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    insertarMiembroAGrupo(idGrupo,cedula,idRama,idZona,idMovimiento,idLider){
        //AUN NO ESTA EN LA BASE
        return this.client.query("select * from insertarMiembroAGrupo('"+cedula+"', '"+idGrupo+"', "+idRama+", "+idZona+", '"+idMovimiento+"', "+idLider+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    insertarGrupo(idZona,idMonitor,idRama,idMonitor2){
        //AUN NO ESTA EN BASE
        return this.client.query("select * from insertarGrupo("+idZona+", '"+idMonitor+"', "+idRama+", '"+idMonitor2+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    insertarGrupo(idZona,idMonitor,idRama){
        //AUN NO ESTA EN BASE
        return this.client.query("select * from insertarGrupo("+idZona+", '"+idMonitor+"', "+idRama+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    cambiarMiembroDeGrupo(idMiembro,idRama,idGrupoNuevo,idMovimiento,idZona){
        //AUN NO ESTA EN BASE
        return this.client.query("select * from cambiarMiembroGrupo("+idGrupoNuevo+", '"+idMiembro+"', "+idRama+", '"+idMovimiento+"', "+idZona+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getMiembrosXGrupo(idGrupo){
        return this.client.query("select * from Miembro inner join GrupoMiembros on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_grupo = "+idGrupo)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    editarMiembro(pCedula,pNombre,pCelular,pEmail,pProvincia,pCanton,pDistrito,pSenas){
        //AUN NO ESTA EN LA BASE
        return this.client.query("select * from editarMiembro('"+pCedula+"', '"+pNombre+"', '"+pCelular+"', '"+pEmail+"', '"+pProvincia+"', '"+pCanton+"', '"+pDistrito+"', '"+pSenas+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    asignarJefeGrupo(idGrupo,cedulaMiembro){
        //AUN NO ESTA EN LA BASE
        return this.client.query("select * from asignarJefeGrupo('"+cedulaMiembro+"', "+idGrupo+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    asignarJefeRama(idRama,cedulaMiembro){
        //AUN NO ESTA EN LA BASE
        return this.client.query("select * from asignarJefeRama('"+cedulaMiembro+"', "+idRama+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getGruposXMiembro(idMiembro){
        const quer="select GrupoMiembros.id_grupo,GrupoMiembros.id_rama,GrupoMiembros.id_zona,GrupoMiembros.id_movimiento from GrupoMiembros inner join Miembro on Miembro.cedula=GrupoMiembros.id_miembro where Miembro.cedula = '"
        return this.client.query(quer+idMiembro+"'")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getJefesXZona(idZona){
        const quer="select * from Zona inner join GrupoMiembros on GrupoMiembros.id_zona=Zona.id_zona inner join GrupoMiembrosRol on GrupoMiembros.id_lider=GrupoMiembrosRol.id_lider where zona.id_zona = "
        return this.client.query(quer+idZona+" and GrupoMiembros.id_lider < 5 and GrupoMiembros.id_lider!=1")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

}
const dao=new DAO();
dao.getGruposXMiembro('117940925');
//dao.getZonaXMovimiento('4000042145');
//dao.getJefesXZona(1);
//dao.getMiembroXMovimiento("'4000042145'");
//dao.loginAsesor("'117380721'","'Yoquese'");
//dao.getMovimientoXAsesor("'117380721'");
//dao.getGrupo(1);
//contrasena: 'Yoquese'
//cedula: '117380721'
//dao.getGrupoMiembrosRol();
//dao.getTelefonoMovimiento();
//dao.getGrupoMiembros();
//dao.getRamas();
//dao.getGrupo();
//dao.getAsesor();
//Movimiento: '4000042145'
//dao.getMiembrosXGrupo(1);
//dao.getGrupoXMovimiento('4000042145');
//'Rescata gatos'
/*
1-
2-Listo dao.getGruposXMiembro(cedula);
3-
4-LIsto getJefesXZona(idZona)
5-
6-
7-
*/