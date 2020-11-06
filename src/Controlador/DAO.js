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

//export default class DAO{
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
//
    getTelefonoMovimiento(idMoviemiento){
        this.client.query("select * from Telefonos where cedula_movimiento = '"+idMoviemiento+"'")
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
        this.client.query("select * from Asesor where cedula = '"+idAsesor+"'")
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
        return this.client.query(`select * from verificarContrasenaAsesor('${pCedula}','${pContrasena}')`)
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    insertarGrupo(idMovimiento,idZona,idRama,idGrupo,bMonitores,pNombre){
        return this.client.query("select * from insertarGrupo('"+idMovimiento+"', "+idZona+", "+idRama+", "+idGrupo+", "+bMonitores+", "+pNombre+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
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

    insertarZona(pIdMovimiento,pNombre){
        return this.client.query("select * from insertarZona('"+pIdMovimiento+"', '"+pNombre+"')")
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

    insertarMiembroAGrupo(idGrupo,cedula,idRama,idZona,idMovimiento){
        return this.client.query("select * from insertarMiembroAGrupo('"+cedula+"', '"+idGrupo+"', "+idRama+", "+idZona+", '"+idMovimiento+"')")
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
        return this.client.query("select * from cambiarMiembroGrupo('"+idMiembro+"', "+idGrupoNuevo+", "+idRama+", "+idZona+", '"+idMovimiento+"')")
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

    editarMiembro(pCedula,pNombre,pCelular,pEmail,pProvincia,pCanton,pDistrito,pSenas,pBMonitor){
        return this.client.query("select * from editarMiembro('"+pCedula+"', '"+pNombre+"', '"+pCelular+"', '"+pEmail+"', '"+pProvincia+"', '"+pCanton+"', '"+pDistrito+"', '"+pSenas+"', "+pBMonitor+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    asignarJefeGrupo(idGrupo,cedulaMiembro,idRama,idZona,idMovimiento){
        return this.client.query("select * from asignarJefeGrupo('"+cedulaMiembro+"', "+idGrupo+", "+idRama+", "+idZona+", '"+idMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    asignarJefeRama(idRama,cedulaMiembro,idZona,idMovimiento){
        return this.client.query("select * from asignarJefeRama('"+cedulaMiembro+"', "+idRama+", "+idZona+", '"+idMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    asignarJefeZona(cedulaMiembro,idZona,idMovimiento){
        return this.client.query("select * from asignarJefeZona('"+cedulaMiembro+"', "+idZona+", '"+idMovimiento+"')")
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
        const quer="select GrupoMiembros.id_grupo,GrupoMiembros.id_rama,GrupoMiembros.id_zona,GrupoMiembros.id_movimiento, Grupo.nombre, GrupoMiembrosRol.nombre_lider from Grupo inner join GrupoMiembros on GrupoMiembros.id_grupo=Grupo.id_Grupo inner join Miembro on Miembro.cedula=GrupoMiembros.id_miembro inner join GrupoMiembrosRol on GrupoMiembros.id_lider=GrupoMiembrosRol.id_lider where Miembro.cedula = '"        
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
    }

    getAllGrupoMiembros(){
        const quer="select * from GrupoMiembros"
        return this.client.query(quer)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    eliminarJefeGrupo(pCedula,pIdGrupo,pIdRama,pIdZona,pIdMovimiento){
        return this.client.query("select * from eliminarjefegrupo('"+pCedula+"', "+pIdGrupo+", "+pIdRama+", "+pIdZona+", '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    eliminarJefeRama(pCedula,pIdRama,pIdZona,pIdMovimiento){
        return this.client.query("select * from eliminarjeferama('"+pCedula+"', "+pIdRama+", "+pIdZona+", '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    eliminarJefeZona(pCedula,pIdZona,pIdMovimiento){
        return this.client.query("select * from eliminarjeferama('"+pCedula+"', "+pIdZona+", '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    eliminarDeGrupo(pCedula,pIdGrupo,pIdRama,pIdZona,pIdMovimiento){
        return this.client.query("select * from eliminardegrupo('"+pCedula+"', "+pIdGrupo+", "+pIdRama+", "+pIdZona+", '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    modificarMovimiento(pIdMovimiento,pNombre, pPais, pProvincia, pCanton, pDistrito, pSenales, pDireccionWeb, pLogo, pTelefonos){
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
                console.log(err)
                this.client.end()
            })
    }

    modificarZona(pIdMovimiento,pIdZona,pNombre){
        return this.client.query("select * from editarzona('"+pIdMovimiento+"', "+pIdZona+", '"+pNombre+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    modificarRama(pIdMovimiento,pIdZona,pIdRama,pNombre){
        return this.client.query("select * from editarrama('"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+", '"+pNombre+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    modificarGrupo(pIdMovimiento,pIdZona,pIdRama,pIdGrupo,pB_Monitores,pNombre){
        return this.client.query("select * from editargrupo('"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+", "+pIdGrupo+", "+pB_Monitores+", '"+pNombre+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }

    monitoresProbables(pIdMovimiento,pIdZona,pIdRama,pIdGrupo){
        return this.client.query("select * from monitoresprobables('"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+", "+pIdGrupo+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                this.client.end()
            })
    }
}
const dao=new DAO();
dao.getGruposXMiembro('117480362');
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