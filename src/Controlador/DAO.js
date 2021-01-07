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

    async getMovimiento(idMovimiento){
        return this.client.query(`select * from Movimiento where cedula_juridica = '${idMovimiento}'`)
        .then(res => {
            //console.table(res.rows)
            return res.rows;
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    async getMovimientos(){
        return this.client.query(`select * from getMovimientos()`)
        .then(res => {
            return res.rows;
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getMovimientosXMiembro(pCedula){
        return this.client.query(`select * from getmovimientosXmiembro('${pCedula}')`)
            .then(res => {
                //console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getMovimientoXAsesor(id_asesor){
        return this.client.query(`select * from Movimiento where id_asesor = '${id_asesor}'`)
            .then(res => {
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }

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
            })
    }

    getZona(idZona){
        this.client.query("select * from Zona where id_zona = ''"+idZona)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }

    getRamas(){
        this.client.query("select * from Rama")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }
    

    getRama(idRama){
        this.client.query("select * from Rama where id_rama = "+idRama)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    getRamaXZona(idZona){
        this.client.query("select * from Rama where id_zona = "+idZona)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
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
            })
    }

    

    getGrupo(idGrupo){
        this.client.query("select * from Grupo where id_grupo = "+idGrupo)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }

    getGrupos(){
        this.client.query("select * from Grupo")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
    }

    getGrupoXRama(idRama){
        return this.client.query(`select * from Grupo where id_rama = '${idRama}'`)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
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
            })
    }

    getGrupoMiembros(idGrupo,idMovimiento){
        this.client.query("select * from GrupoMiembros where id_grupo = "+idGrupo+" AND id_movimiento='"+idMovimiento+"'")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
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
            })
    }

    getGruposMiembroxMiembro(idMiembro,idMovimiento){
        //Grupos donde esta y el rol
        return this.client.query("select * from GrupoMiembros inner join GrupoMiembrosRol on GrupoMiembros.id_lider = GrupoMiembrosRol.id_lider where GrupoMiembros.id_miembro='"+idMiembro+"' AND GrupoMiembros.id_movimiento = '"+idMovimiento+"'")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    }

    getMiembros(){
        this.client.query("select * from Miembro")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                console.log(err)
            })
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
    getMiembroXMovimiento(idMovimiento){
        //select * from GrupoMiembros inner join Miembro on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_movimiento = '"+idMovimiento+"' and Miembro.id_movimiento= '"+idMovimiento+"'
        //"select * from GrupoMiembros inner join Miembro on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_movimiento = '"+idMovimiento+"'"
        return this.client.query("select * from GrupoMiembros inner join Miembro on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_movimiento = '"+idMovimiento+"' and Miembro.id_movimiento= '"+idMovimiento+"'")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                console.log(err)
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

    async inicioSesion(pCedula, pContrasena, idMovimiento){
        return this.client.query(`select * from iniciosesion('${pCedula}','${pContrasena}','${idMovimiento}')`)
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }
    
    async insertarGrupo(idMovimiento,idZona,idRama, idGrupo, bMonitores,pNombre, idMonitor1, idMonitor2){
        if(!idMonitor2){
            idMonitor2 = "";
        }
        return this.client.query("select * from insertarGrupo('"+idMovimiento+"', "+idZona+", "+idRama+", '"+idGrupo+"', "+bMonitores+", '"+pNombre+"','"+idMonitor1+"','"+idMonitor2+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async insertarRama(pIdMovimiento,pIdZona,pNombre){
        console.log(pNombre)
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

    async insertarMiembro(pIdMovimiento,pCedula,pNombre,pCelular,pEmail,pProvincia,pCanton,pDistrito,pSenas, pPosibleMonitor){
        return this.client.query("select * from insertarMiembro('"+pIdMovimiento+"', '"+pCedula+"', '"+pNombre+"', '"+pCelular+"', '"+pEmail+"', '"+pProvincia+"', '"+pCanton+"', '"+pDistrito+"', '"+pSenas+"' , "+pPosibleMonitor+")")
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

    async getMiembrosXGrupo(idGrupo,idMovimiento){
        return this.client.query("select * from Miembro inner join GrupoMiembros on Miembro.cedula=GrupoMiembros.id_miembro where GrupoMiembros.id_grupo = "+idGrupo+" AND GrupoMiembros.id_movimiento = '"+idMovimiento+"'")
            .then(res => {
                console.table(res.rows)
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

    async getGruposXMiembro(idMiembro,idMovimiento){
        const quer="select * from GrupoMiembros "
        const quer2=quer+"inner join GrupoMiembrosRol on GrupoMiembros.id_lider = GrupoMiembrosRol.id_lider "
        const quer3=quer2+"inner join Grupo on (GrupoMiembros.id_movimiento=Grupo.id_movimiento AND GrupoMiembros.id_zona=Grupo.id_zona "
        const quer4=quer3+"AND GrupoMiembros.id_rama=Grupo.id_rama AND GrupoMiembros.id_grupo=Grupo.id_grupo)"
        const quer5=quer4+"where GrupoMiembros.id_movimiento='"+idMovimiento+"' AND GrupoMiembros.id_miembro='"
        return this.client.query(quer5+idMiembro+"'")
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async cambioMiembroGrupo(pCedula,pIdGrupoViejo, pIdGrupoNuevo, pIdRama, pIdZona, pIdMovimiento){
        const quer="select * from cambiarmiembrogrupo ('"+pCedula+"','"+pIdGrupoViejo+"','"+pIdGrupoNuevo+ "',"+pIdRama+","+pIdZona+",'"+pIdMovimiento+"')"
        return this.client.query(quer)
            .then(res => {
                console.table(res.rows)
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    } 

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
        var queryPT1="select * from modificarMovimiento('"+pIdMovimiento+"', '"+pNombre+"', '"+pPais+"', '"+pProvincia+"', '"+pCanton+"', '";
        var queryPT2=pDistrito+"', '"+pSenales+"', '"+pDireccionWeb+"', '"+pLogo+"', ARRAY["+pTelefonos+"])"
        console.log(queryPT1+queryPT2);
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

    async modificarMiembro(pIdMovimiento, pCedula, pNombre, pCelular, pEmail, pProvincia, pCanton, pDistrito, pSenas, pBMonitor){
        return this.client.query("select * from editarMiembro('"+pIdMovimiento+"', '"+pCedula+"', '"+pNombre+"', '"+pCelular+"', '"+pEmail+"', '"+pProvincia+"', '"+pCanton+"', '"+pDistrito+"', '"+pSenas+"', "+pBMonitor+")")
            .then( res => {
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

    async otrasRamas(pCedula,pIdMovimiento){
        return this.client.query("select * from otrasRamas('"+pCedula+"', '"+pIdMovimiento+"')")
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

    async ramasDeMiembros(pCedula,pIdMovimiento){
        return this.client.query("select * from ramasDeMiembro('"+pCedula+"', '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async zonasDeLider(pCedula, pIdMovimiento){
        return this.client.query("select * from zonasdelider('"+pCedula+"', '"+pIdMovimiento+"')")
        .then(res => {
            console.table(res.rows);
            return res.rows;
        })
        .catch(err => {
            throw err
        })
    }

    async ramasDeLider(pCedula, pIdMovimiento, pIdZona){
        return this.client.query("select * from ramasdelider('"+pCedula+"', '"+pIdMovimiento+"', "+pIdZona+")")
        .then(res => {
            console.table(res.rows);
            return res.rows;
        })
        .catch(err => {
            throw err
        })
    }

    async zonasMiembro(pCedula, pIdMovimiento){
        return this.client.query("select * from zonasdemiembro('"+pCedula+"', '"+pIdMovimiento+"')")
        .then(res => {
            console.table(res.rows);
            return res.rows;
        })
        .catch(err => {
            throw err
        })
    }

    async todasRamasDeMiembro(pCedula, pIdMovimiento, pIdZona){
        return this.client.query("select * from todasRamasdeMiembro('"+pCedula+"', '"+pIdMovimiento+"', "+pIdZona+")")
        .then(res => {
            console.table(res.rows);
            return res.rows;
        })
        .catch(err => {
            throw err
        })
    }

    async todosGruposDeMiembro(pCedula, pIdMovimiento){
        return this.client.query("select * from todosgruposdemiembro('"+pCedula+"', '"+pIdMovimiento+"')")
        .then(res => {
            console.table(res.rows);
            return res.rows;
        })
        .catch(err => {
            throw err
        })
    }

    async gruposDeMiembro(pCedula, pIdMovimiento,pIdZona,pIdRama){
        return this.client.query("select * from gruposdemiembro('"+pCedula+"', '"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+")")
        .then(res => {
            console.table(res.rows);
            return res.rows;
        })
        .catch(err => {
            throw err
        })
    }

    async gruposDeLider(pCedula, pIdMovimiento, pIdZona, pIdRama){
        return this.client.query("select * from gruposdelider('"+pCedula+"', '"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+")")
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


    async agregarAsesor(pCanton,pCedula,pCelular,pContrasena,pDistrito,pNombre,pProvincia,pSenales,pEmail){
        return this.client.query("select * from agregarAsesor('"+pCanton+"', '"+pCedula+"', '"+pCelular+"', '"+pContrasena+"', '"+pDistrito+"', '"+pNombre+"', '"+pProvincia+"', '"+pSenales+"', '"+pEmail+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async eliminarAsesor(pCedula){
        return this.client.query("select * from eliminarAsesor('"+pCedula+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async editarAsesor(pCanton,pCedula,pCelular,pContrasena,pDistrito,pNombre,pProvincia,pSenales,pEmail){
        return this.client.query("select * from editarAsesor('"+pCanton+"', '"+pCedula+"', '"+pCelular+"', '"+pContrasena+"', '"+pDistrito+"', '"+pNombre+"', '"+pProvincia+"', '"+pSenales+"', '"+pEmail+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async crearMovimiento(pCanton,pCedulaJuridica,pIdAsesor,pLogo,pDireccionWeb,pDistrito,pNombre,pProvincia,pPais,pSenales,pTelefonos){
        return this.client.query("select * from crearMovimiento('"+pCanton+"', '"+pCedulaJuridica+"', '"+pIdAsesor+"', '"+pLogo+"', '"+pDireccionWeb+"', '"+pDistrito+"', '"+pNombre+"', '"+pProvincia+"', '"+pPais+"', '"+pSenales+"', ARRAY["+pTelefonos+"])")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async modificarContrasena(pCedula, pContrasena){
        return this.client.query(`select * from agregarcontrasena('${pContrasena}','${pCedula}')`)
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async crearNoticia(pNombre,pContenido, pIdMiembro, pIdMovimiento,pIdZona,pIdRama,pIdGrupo){
        return this.client.query("Select * from crearNoticia('"+pNombre+"', '"+pContenido+"', '"+pIdMiembro+"', '"+pIdMovimiento+"', "+pIdZona+", "+pIdRama+", "+pIdGrupo+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async noticiaLeida(pIdNoticia, pIdMiembro){
        return this.client.query("Select * from noticiaLeida("+pIdNoticia+", '"+pIdMiembro+"')")
        .then(res => {
            console.table(res.rows);
            return res.rows;
        })
        .catch(err => {
            throw err
        })
    }

    async getNoticias(){
        return this.client.query("Select * from Noticia")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getNoticiaMiembro(idNoticia, idMiembro){
        return this.client.query("Select Noticia.id_noticia, contenido, Noticia.id_miembro, fecha_publicacion, Noticia.id_movimiento, id_zona, id_rama, id_grupo, nombre, leido from Noticia inner join noticiasmiembro on Noticia.id_noticia = noticiasmiembro.id_noticia where Noticia.id_noticia="+idNoticia+"AND noticiasmiembro.id_miembro='"+idMiembro+"'")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getNoticiaXMiembro(idNoticia,idMiembro){
        return this.client.query("Select * from Noticia inner join noticiasmiembro on Noticia.id_Noticia=noticiasmiembro.id_noticia where Noticia.id_noticia="+idNoticia+"and noticiasmiembro.id_miembro='"+idMiembro+"'")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async insertarNoticiaXMiembros(pIdNoticia,pIdMiembros,pIdMovimiento){
        return this.client.query("Select * from insertarNoticiaXMiembros("+pIdNoticia+", ARRAY["+pIdMiembros+"], '"+pIdMovimiento+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async noticiasMiembro(pIdMovimiento,pIdMiembro){
        return this.client.query("Select * from noticiasMiembro('"+pIdMovimiento+"', '"+pIdMiembro+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getAllReportes(idMovimiento){
        return this.client.query("Select count(*) from Aporte where id_movimiento='"+idMovimiento+"'")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getReporteTipo(idMovimiento){
        return this.client.query("Select Tipo,count(*) from Aporte where id_movimiento='"+idMovimiento+"' group by Tipo")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getAllNoticiasXMiembro(){
        return this.client.query("Select * from NoticiasMiembro")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async noticiaRecibidasMiembro(pIdMovimiento,pIdMiembro){
        return this.client.query("Select * from noticiaRecibidasMiembro('"+pIdMovimiento+"', '"+pIdMiembro+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async insertarImagenNoticia(idNoticia,imagen){
        return this.client.query("Select * from insertarImagen('"+idNoticia+"', '"+imagen+"')")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getAllImagen(){
        return this.client.query("Select id_noticia from ImagenesXNoticia")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async crearAporte(pTipo,pContenido,pIdEmisor,pIdMovimiento){
        return this.client.query("Select * from crearAporte('"+pTipo+"', '"+pContenido+"', '"+pIdEmisor+"', '"+pIdMovimiento+"' )")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getAllAportes(){
        return this.client.query("Select * from Aporte")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getAportesMov(idMovimiento){
        return this.client.query("Select * from Aporte where id_movimiento='"+idMovimiento+"'")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async getAporteId(idAporte){
        return this.client.query("Select * from Aporte where id_aporte="+idAporte)
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async deleteAportesMov(idMovimiento){
        return this.client.query("Delete from Aporte where id_movimiento='"+idMovimiento+"'")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }

    async imagenesNoticia(pIdNoticia){
        return this.client.query("Select * from imagenesNoticia("+pIdNoticia+")")
            .then(res => {
                console.table(res.rows);
                return res.rows;
            })
            .catch(err => {
                throw err
            })
    }
}



// '117940925' │ '60283895' │  'helado123'  │ 'Desamparados' │ 'arielAraya193@gmail.com' │  'Ariel Araya Corrales'
var dao=new DAO();
//dao.getMiembros();
dao.getNoticias();
//var res= dao.getAllReportes('4000042145')
//dao.crearAporte('Agradecimiento','Agradezco a jesucristo el robot del futuro','117940925','4000042145')
//dao.getMiembros();
//dao.getallmov();
//dao.getMovimiento('4000042145');
//dao.getRamaXMovimiento('4000042145')

//dao.getAportesMov('4000042145')
//dao.deleteAportesMov('4000042145')
//dao.getAllAportes();
//dao.insertarImagenNoticia(1,"imaginese que es una imagen")
//dao.noticiaRecibidasMiembro('4000042145','117940925')
//dao.noticiaRecibidasMiembro('4000042145','117940925')
//dao.getNoticiasMiembro('4000042145','117940925')
//dao.insertarNoticiaXMiembros(2,['117940925','117520337'],'4000042145')
//dao.getAllNoticiasXMiembro();


//dao.crearAporte("Ofrecimiento","Ofrezco mi cuerpo",'117940925','4000042145')
//dao.getAllReportes('4000042145')
//dao.getReporteTipo('4000042145')
//dao.getAllImagen()
//dao.imagenesNoticia(1)
//dao.getNoticiaXMiembro(1,'117940925')

