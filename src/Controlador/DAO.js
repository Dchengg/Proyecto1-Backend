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

//export default class DAO{ ??
export default class DAO{
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
//
    async getTelefonoMovimiento(idMovimiento){
        return this.client.query("select * from Telefonos where cedula_movimiento = '"+idMovimiento+"'")
        .then(res => {
            console.table(res.rows)
            return res.rows;
        })
        .catch(err => {
            console.log(err)
        })
    }


    getZonas(){
        return this.client.query(`select * from Zona `)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }


    getZonaXMovimiento(idMovimiento){
        return this.client.query("Select * from getZonas('"+idMovimiento+"')")
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
        //return this.client.query(`select * from Rama where Rama.id_movimiento = '${idMovimiento}'`)
        return this.client.query("select * from getRamas('"+idMovimiento+"')")
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
        return this.client.query("Select * from getGrupos('"+idMovimiento+"')")
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
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getGruposMiembroxMiembro(idMiembro){
        //Grupos donde esta y el rol
        this.client.query("select * from GrupoMiembros inner join GrupoMiembrosRol on GrupoMiembros.id_lider = GrupoMiembrosRol.id_lider where id_miembro='"+idMiembro+"'")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getMiembros(){
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
        this.client.query("select * from getMiembro('"+idMiembro+"')")
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
        return this.client.query("select * from GrupoMiembros inner join Miembro on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_movimiento = '"+idMovimiento+"'")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getAsesor(idAsesor){
        return this.client.query("select * from Asesor where cedula = '"+idAsesor+"'")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    loginAsesor(pCedula,pContrasena){
        return this.client.query(`select * from verificarContrasenaAsesor('${pCedula}','${pContrasena}')`)
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    async insertarGrupo(idMovimiento,idZona,idRama, idGrupo, bMonitores,pNombre, idMonitor1, idMonitor2){
        return this.client.query("select * from insertarGrupo('"+idMovimiento+"', "+idZona+", "+idRama+", '"+idGrupo+"', "+bMonitores+", '"+pNombre+"','"+idMonitor1+"','"+idMonitor2+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
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
                throw err
            })
    }

    async insertarZona(pIdMovimiento,pNombre){
        return this.client.query("select * from insertarZona('"+pIdMovimiento+"', '"+pNombre+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async insertarMiembro(pCedula,pNombre,pCelular,pEmail,pProvincia,pCanton,pDistrito,pSenas, pPosibleMonitor){
        return this.client.query("select * from insertarMiembro('"+pCedula+"', '"+pNombre+"', '"+pCelular+"', '"+pEmail+"', '"+pProvincia+"', '"+pCanton+"', '"+pDistrito+"', '"+pSenas+"' , "+pPosibleMonitor+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async insertarMiembroAGrupo(idGrupo,cedula,idRama,idZona,idMovimiento){
        return this.client.query("select * from insertarMiembroAGrupo('"+cedula+"', '"+idGrupo+"', "+idRama+", "+idZona+", '"+idMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    

    async cambiarMiembroDeGrupo(idMiembro,idRama,idGrupoNuevo,idMovimiento,idZona){
        return this.client.query("select * from cambiarMiembroGrupo('"+idMiembro+"', "+idGrupoNuevo+", "+idRama+", "+idZona+", '"+idMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getMiembrosXGrupo(idGrupo){
        return this.client.query("select * from Miembro inner join GrupoMiembros on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_grupo = "+idGrupo)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async editarMiembro(pCedula,pNombre,pCelular,pEmail,pProvincia,pCanton,pDistrito,pSenas,pBMonitor){
        return this.client.query("select * from editarMiembro('"+pCedula+"', '"+pNombre+"', '"+pCelular+"', '"+pEmail+"', '"+pProvincia+"', '"+pCanton+"', '"+pDistrito+"', '"+pSenas+"', "+pBMonitor+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async asignarJefeGrupo(cedulaMiembro,idZona,idRama,idGrupo,idMovimiento){
        return this.client.query("select * from asignarJefeGrupo('"+cedulaMiembro+"', "+idGrupo+", "+idRama+", "+idZona+", '"+idMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async asignarJefeRama(cedulaMiembro,idZona,idRama,idMovimiento){
        return this.client.query("select * from asignarJefeRama('"+cedulaMiembro+"', "+idRama+", "+idZona+", '"+idMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async asignarJefeZona(cedulaMiembro,idZona,idMovimiento){
        return this.client.query("select * from asignarJefeZona('"+cedulaMiembro+"', "+idZona+", '"+idMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getGruposXMiembro(idMiembro){
        const quer="select * from GrupoMiembros "
        const quer2=quer+"inner join GrupoMiembrosRol on GrupoMiembros.id_lider = GrupoMiembrosRol.id_lider "
        const quer3=quer2+"inner join Grupo on (GrupoMiembros.id_movimiento=Grupo.id_movimiento AND GrupoMiembros.id_zona=Grupo.id_zona "
        const quer4=quer3+"AND GrupoMiembros.id_rama=Grupo.id_rama AND GrupoMiembros.id_grupo=Grupo.id_grupo)"
        const quer5=quer4+"where GrupoMiembros.id_miembro='"
        return this.client.query(quer5+idMiembro+"'")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }
    /*
    getJefesXZona(idZona){
        const quer="select * from Zona inner join GrupoMiembros on GrupoMiembros.id_zona=Zona.id_zona inner join GrupoMiembrosRol on GrupoMiembros.id_lider=GrupoMiembrosRol.id_lider where zona.id_zona = "
        return this.client.query(quer+idZona+" and GrupoMiembros.id_lider = 4")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getJefesXRama(idRama){
        const quer="select * from Rama inner join GrupoMiembros on GrupoMiembros.id_rama=Rama.id_rama inner join GrupoMiembrosRol on GrupoMiembros.id_lider=GrupoMiembrosRol.id_lider where Rama.id_rama = "
        return this.client.query(quer+idRama+" and GrupoMiembros.id_lider = 3 ")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    getJefesXGrupo(idGrupo){
        const quer="select * from Grupo inner join GrupoMiembros on GrupoMiembros.id_grupo=Grupo.id_grupo inner join GrupoMiembrosRol on GrupoMiembros.id_lider=GrupoMiembrosRol.id_lider where Grupo.id_grupo = "
        return this.client.query(quer+idGrupo+" and GrupoMiembros.id_lider = 2")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }*/

    async getAllGrupoMiembros(){
        const quer="select * from GrupoMiembros"
        return this.client.query(quer)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async eliminarJefeGrupo(pCedula,pIdZona,pIdRama,pIdGrupo,pIdMovimiento){
        return this.client.query("select * from eliminarjefegrupo('"+pCedula+"', "+pIdGrupo+", "+pIdRama+", "+pIdZona+", '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async eliminarJefeRama(pCedula,pIdZona,pIdRama,pIdMovimiento){
        return this.client.query("select * from eliminarjeferama('"+pCedula+"', "+pIdRama+", "+pIdZona+", '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async eliminarJefeZona(pCedula,pIdZona,pIdMovimiento){
        try {
            const res = await this.client.query("select * from eliminarjefezona('" + pCedula + "', " + pIdZona + ", '" + pIdMovimiento + "')");
            console.table(res.rows);
            return res.rows;
        }
        catch (err) {
            throw err;
        }
    }

    async eliminarDeGrupo(pCedula,pIdGrupo,pIdRama,pIdZona,pIdMovimiento){
        return this.client.query("select * from eliminardegrupo('"+pCedula+"', "+pIdGrupo+", "+pIdRama+", "+pIdZona+", '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async modificarMovimiento(pIdMovimiento,pNombre, pPais, pProvincia, pCanton, pDistrito, pSenales, pDireccionWeb, pLogo, pTelefonos){
        //TELEFONOS, EN PLURAL, ES UNA LISTA
        //La lista que recibe el DAO va asi: [elem1,elem2]
        queryPT1="select * from modificarMovimiento('"+pIdMovimiento+"', '"+pNombre+"', '"+pPais+"', '"+pProvincia+"', '"+pCanton+"', '";
        queryPT2=pDistrito+"', '"+pSenales+"', '"+pDireccionWeb+"', '"+pLogo+"', {"+pTelefonos+"})"
        return this.client.query(queryPT1+queryPT2)
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async modificarZona(pIdMovimiento,pIdZona,pNombre){
        return this.client.query("select * from editarzona('"+pIdMovimiento+"', "+pIdZona+", '"+pNombre+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async modificarRama(pIdMovimiento,pIdZona,pIdRama,pNombre){
        return this.client.query("select * from editarrama('"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+", '"+pNombre+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async modificarGrupo(pIdMovimiento,pIdZona,pIdRama,pIdGrupo,pB_Monitores,pNombre){
        return this.client.query("select * from editargrupo('"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+", "+pIdGrupo+", "+pB_Monitores+", '"+pNombre+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async monitoresProbables(pIdMovimiento,pIdZona,pIdRama,pIdGrupo){
        return this.client.query("select * from monitoresprobables('"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+", "+pIdGrupo+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async asignarMonitorGrupo(pCedula,pIdZona,pIdRama,pIdGrupo,pIdMovimiento,){
        return this.client.query("select * from asignarMonitorGrupo('"+pCedula+"', "+pIdGrupo+", "+pIdRama+", "+pIdZona+", '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async otrasRamas(pCedula){
        return this.client.query("select * from otrasRamas('"+pCedula+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err;
            })
    }
    
    async todosLosMonitores(idMovimiento,idZona){
        return this.client.query("select * from todoslosmonitores('"+idMovimiento+"', "+idZona+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err;
            })
    }

    async ramasDeMiembros(pCedula){
        return this.client.query("select * from ramasDeMiembro('"+pCedula+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async grupoDeMiembroEnRama(pIdMovimiento,pIdZona,pIdRama,pCedula){
        return this.client.query("select * from grupoDeMiembroEnRama('"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+", '"+pCedula+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }
}
const dao=new DAO();
//dao.ramasDeMiembros("117940925");

//dao.getGruposMiembroxMiembro('117940925');

//dao.grupoDeMiembroEnRama('4000042145',1,3,'117940925');
//
//dao.getGruposMiembroxMiembro('117940925');

//dao.getGruposXMiembro('117480362');


//dao.monitoresProbables('4000042145',1,1,1)
//dao.modificarZona('4000042145',1,"GAM");
//dao.getZonaXMovimiento('4000042145');
//dao.getRamaXMovimiento('4000042145');
//dao.modificarRama('4000042145',1,7,"Rama Prueba");
//dao.getRamaXMovimiento('4000042145');
//dao.getGrupoXMovimiento('4000042145');
//dao.modificarZona();
//dao.modificarRama();
//dao.modificarGrupo('4000042145',1,2,1234,true,"Rescata Serpientes");
//dao.getGrupos();
//dao.getZonas();
//dao.insertarZona('4000042145',"Zona Norte");
//dao.getRamas();
//dao.insertarRama('4000042145',1,"Rama Prueba");
//dao.getRamaXMovimiento('4000042145');
//dao.getGrupoMiembros(1);
//dao.getAsesor('117380721');
//dao.getZonaXMovimiento('4000042145');
//dao.getTelefonoMovimiento('4000042145');
//dao.getAllGrupoMiembros();
//dao.getGruposXMiembro('117940925');
//dao.getZonaXMovimiento('4000042145');
//dao.getJefesXZona(1);
//dao.getMiembroXMovimiento("4000042145");
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
1-Modificar mov, zona, rama, grupo
    Listo
    modificarZona(pIdMovimiento,pIdZona,pNombre)
    modificarRama(pIdMovimiento,pIdZona,pIdRama,pNombre)
    modificarGrupo(pIdMovimiento,pIdZona,pIdRama,pIdGrupo,pB_Monitores,pNombre,pJefe1,pJefe2)
2-Listo dao.getGruposXMiembro(cedula);
3-insertarGrupo(idMovimiento,idZona,idRama,idGrupo,bMonitores,pNombre)
    insertarRama(pIdMovimiento,pIdZona,pNombre)
    insertarZona(pIdMovimiento,pNombre)
    FALTA INSERTAR MOVIMIENTO
4-LIsto getJefesXZona(idZona)
5-Listo Modificar jefes:
    asignarJefeGrupo(idGrupo,cedulaMiembro,idRama,idZona,idMovimiento)
    asignarJefeRama(idRama,cedulaMiembro,idZona,idMovimiento)
    asignarJefeZona(cedulaMiembro,idZona,idMovimiento)
    eliminarJefeGrupo(pCedula,pIdGrupo,pIdRama,pIdZona,pIdMovimiento)
    eliminarJefeRama(pCedula,pIdRama,pIdZona,pIdMovimiento)
    eliminarJefeZona(pCedula,pIdZona,pIdMovimiento)
6-Listo eliminar miembro de grupo:
    eliminarDeGrupo(pCedula,pIdGrupo,pIdRama,pIdZona,pIdMovimiento)
7-Listo insertarMiembroAGrupo(idGrupo,cedula,idRama,idZona,idMovimiento)
*/