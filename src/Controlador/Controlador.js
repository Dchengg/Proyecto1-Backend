import Movimiento from './Movimiento.js';
import ControladorLogin from './ControladorLogin'
import DAO from './DAO'

export default class Controlador{
    constructor(){
        this.movimientos = new Map();
        this.dao = new DAO();
        //this.movimientos.set(1,new Movimiento("1","123","movimiento","http:..","cool","CR","SJ","P","C","D","Del palo de limón, tres cuadras norte :v"))
    }
     
    crearMovimiento(cedulaJuridica, idAsesor,nombre, direccionWeb, logo, pais, provimicia, canton, distrito, senas){
        if(this.movimientos.has(cedulaJuridica)){
            throw { message: "Movimiento con el id: " + cedulaJuridica +" ya existe"}
        }
        this.movimientos.set(cedulaJuridica, new Movimiento(cedulaJuridica, idAsesor, nombre, direccionWeb, logo, pais, provimicia, canton, distrito, senas))
    }


    async crearZonaNueva(idMovimiento, nombre){
        var res = await this.dao.insertarZona(idMovimiento, nombre)
        .catch(err => {
            throw err
        })
        this.agregarZona(idMovimiento, res.id_zona, nombre);
    }

    async crearRamaNueva(idMovimiento, idZona, nombre){
        var res = await this.dao.insertarRama(idMovimiento, idZona, nombre)
        .catch(err => {
            throw err
        })
        this.agregarRama(idMovimiento, res.id_rama, nombre)
    }

    async crearRamaNueva(idMovimiento, idZona, idRama, nombre){
        var res = await this.dao.insertarRama(idMovimiento, idZona, nombre)
            .catch(err => {
                throw err
            })
        this.agregarRama(idMovimiento, idZona, res.id_rama, nombre)
    }

    async crearGrupoNuevo(idMoidMovimiento, idZona, idRama, nombre, idEncargado1, idEncargado2, isMonitor){
        var res = await this.dao.insertarGrupo(idMovimiento, idZona, idRama, isMonitor, nombre)
        .catch(err => {
            throw err
        })
        this.agregarGrupo(idMovimiento, idZona, idRama, res.id_grupo, nombre)
    }


    agregarZona(idMovimiento, idZona, nombre){
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.gNodos.crearZona(idZona, nombre); 
    }

    agregarRama(idMovimiento, idZona, idRama, nombre){
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.gNodos.crearRama(idZona, idRama, nombre);
    }

    agregarGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isJefe){
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.gNodos.crearGrupo(idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isJefe);
    }

    agregarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo) {
        if(this.movimientos.has(idMovimiento)){
            var gMiembros = this.movimientos.get(idMovimiento).gMiembros;
            var gNodos = this.movimientos.get(idMovimiento).gNodos; 
            var miembro = gMiembros.crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo);
            gNodos.agregarMiembro(idZona, idRama, idGrupo, miembro);
        }else{
            throw { message: "Movimiento no existe"};
        }
    }

    agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro, ){
        var grupo = this.getGrupo(idMovimiento, idZona, idRama, idGrupo);
        var miembro = this.getMiembro(idMovimiento, idMiembro);
        grupo.agregar(miembro);
    }

    asignarEncargadoGrupo(idMovimiento,idZona, idRama, idGrupo, idMiembro, idMiembro2, isMonitor){
        var grupo = this.getRama(idMovimiento, idZona, idRama, idGrupo);
        this.asignarJefeNodo(grupo, idMiembro, idMiembro2, isMonitor);
    }

    asignarEncargadoRama(idMovimiento,idZona, idRama, idMiembro, idMiembro2, isMonitor){
        var rama = this.getRama(idMovimiento, idZona, idRama);
        this.asignarJefeNodo(rama,idMiembro, idMiembro2, isMonitor);
    }

    asignarEncargadoZona(idMovimiento,idZona, idMiembro, idMiembro2, isMonitor){
        var zona = this.getZona(idMovimiento, idZona);
        this.asignarJefeNodo(zona, idMiembro, idMiembro2, isMonitor);
    }

    asignarJefeNodo(nodo, idMiembro, idMiembro2, isMonitor){
        nodo.asignarEncargados(idMiembro, idMiembro2, isMonitor)
    }

    
    modificarMovimiento(idMovimiento, idAsesor,nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas){
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.cedulaJuridica = idMovimiento;
        movimiento.idAsesor = idAsesor;
        movimiento.nombre = nombre;
        movimiento.direccionWeb = direccionWeb;
        movimiento.logo = logo;
        movimiento.pais = pais;
        movimiento.provincia = provincia;
        movimiento.canton = canton;
        movimiento.distrito = distrito;
        movimiento.senas = senas;
    }

    modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo){
        var movimiento =  this.getMovimiento(idMovimiento);
        var gMiembros = movimiento.gMiembros;
        var miembro = gMiembros.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor)
    }


    consultarZonas(idMovimiento){
        if(this.movimientos.has(idMovimiento)){
            return this.movimientos.get(idMovimiento).gNodos.zonas; 
        }else{
            throw { message: "Movimiento no existe"}
        }
    }

    consultarRamas(idMovimiento, idZona){
        var movimiento = this.getMovimiento(idMovimiento);
        return movimiento.gNodos.consultarRamas(idZona); 
    }

    async consultarRamasDisponibles(idMovimiento, idMiembro){
        try{
            var gruposDeMiembro = await this.getGruposMiembro(idMovimiento, idMiembro);
            var ramas = new Map(this.consultarRamas(idMovimiento, gruposDeMiembro[0].id_zona.toString()));
            console.log(ramas)
            for(var i in gruposDeMiembro){
                ramas.delete(gruposDeMiembro[i].id_rama.toString())
            }
            return ramas;
        }catch(err){
            console.log(err)
            throw err
        }
    }

    consultarGrupos(idMovimiento, idZona, idRama){
        return this.movimientos.get(idMovimiento).gNodos.consultarGrupos(idZona, idRama);
    }

    consultarMiembrosGrupo(idMovimiento, idZona, idRama, idGrupo){
        return this.movimientos.get(idMovimiento).gNodos.consultarMiembrosGrupo(idZona, idRama, idGrupo);
    }

    consultarMiembrosRama(idMovimiento, idZona, idRama){
        return this.movimientos.get(idMovimiento).gNodos.consultarMiembrosGrupo(idZona, idRama);
    }



    getMovimiento(idMovimiento){
        if(this.movimientos.has(idMovimiento)){
            return this.movimientos.get(idMovimiento);
        }else{
            throw { message: "Movimiento no existe " + idMovimiento}
        }
    }

    getMiembro(idMovimiento, idMiembro){
        var movimiento = this.getMovimiento(idMovimiento);
        var miembro = movimiento.gMiembros.getMiembro(idMiembro);
        if(miembro){
            return miembro
        }else{
            throw { message: "No existe ningún miembro con esa cedula"}
        }
    }

    async getGruposMiembro(idMovimiento, idMiembro){
        try{
            var grupos = [];
            const res = await this.dao.getGruposXMiembro(idMiembro);
            for(var i in res){
                console.log(res[i])
                var grupoInfo = res[i];
                grupos.push(grupoInfo);
                return grupos
            }
        }catch(err){
            throw err
        }
    }

    getZona(idMovimiento, idZona){
        var movimiento = this.getMovimiento(idMovimiento);
        var zona = movimiento.gNodos.getZona(idZona);
        if(zona == null){
            throw { message: "No existe una zona con esa identificación"}
        }
        return zona;
    }

    getRama(idMovimiento, idZona, idRama){
        var movimiento = this.getMovimiento(idMovimiento);
        var rama = movimiento.gNodos.getRama(idZona, idRama);
        if(rama == null){
            throw { message: "No existe una zona con esa identificación"}
        }
        return rama;
    }

    getGrupo(idMovimiento, idZona, idRama, idGrupo){
        var movimiento = this.getMovimiento(idMovimiento);
        var grupo = movimiento.gNodos.getGrupo(idZona, idRama, idGrupo);
        if(grupo == null){
            throw { message: "No existe una grupo con esa identificación"}
        }
        return grupo;
    }

    
}
