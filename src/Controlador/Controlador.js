import Movimiento from './Movimiento.js';
import ControladorLogin from './ControladorLogin'
import DAO from './DAO'
import CentroNotificacionesPublicador from './CentroNotificacionesPublicador.js';

export default class Controlador{
    constructor(){
        this.movimientos = new Map();
        this.dao = new DAO();
        this.centroNotificaciones=new CentroNotificacionesPublicador(this.dao);
    }
     
    async crearMovimiento(cedulaJuridica, idAsesor,nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas, telefonos){
        if(this.movimientos.has(cedulaJuridica)){
            throw { message: "Movimiento con el id: " + cedulaJuridica +" ya existe"}
        }
        await this.dao.crearMovimiento(canton, cedulaJuridica, idAsesor, logo, direccionWeb, distrito, nombre, provincia, pais, senas, telefonos);
    }

    async crearAsesor(idAsesor, contrasena, nombre, email, celular, provincia, distrito, canton, senales){
        await this.dao.agregarAsesor(canton, idAsesor, celular, contrasena, distrito, nombre, provincia, senales, email);
    }

    async eliminarAsesor(idAsesor){
        await this.dao.eliminarAsesor(idAsesor);
    }

    async crearZonaNueva(idMovimiento, nombre){
        var idZona;
        await this.dao.insertarZona(idMovimiento, nombre)
        .then(res => {
            this.agregarZona(idMovimiento, res[0].id_zona.toString(), nombre);
            idZona = res[0].id_zona.toString();
        })
        .catch(err => {
            throw err
        })
        return idZona;
    }

    async crearEstructuraBase(idMovimiento, nombreZona, nombreRama, idGrupo, nombreGrupo, idMiembro, idMiembro2,
        nombreMiembro, celular, email, provincia, canton,distrito, senas, posible_monitor){
        await this.dao.insertarZona(idMovimiento, nombreZona)
        .then(resZona => {
            this.dao.insertarRama(idMovimiento,resZona[0].id_zona.toString(),nombreRama)
            .then(resRama => {
                this.dao.insertarMiembro(idMovimiento, idMiembro, nombreMiembro, celular, email, provincia, canton, distrito, senas, posible_monitor);
                if(!nombreGrupo){
                    nombreGrupo = resZona[0].id_zona.toString()+resRama[0].id_rama.toString()+idGrupo;
                }
                this.dao.insertarGrupo(idMovimiento, resZona[0].id_zona.toString(), resRama[0].id_rama.toString(), idGrupo, true, nombreGrupo, idMiembro);
            })
        })
    }

    async crearRamaNueva(idMovimiento, idZona, nombre){
        var idRama;
        await this.dao.insertarRama(idMovimiento,idZona,nombre)
        .then(res => {
            this.agregarRama(idMovimiento, idZona, res[0].id_rama.toString(), nombre)
            idRama = res[0].id_rama.toString();
        })
        .catch(err => {
            throw err
        })
        return idRama;
    }

    async crearGrupoNuevo(idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isMonitor){
        if(!nombre){
            nombre = idZona+idRama+idGrupo;
        }
        await this.dao.insertarGrupo(idMovimiento, idZona, idRama, idGrupo, isMonitor, nombre, idEncargado1, idEncargado2);
        this.agregarGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, isMonitor, idEncargado1, idEncargado2)
        this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idEncargado1);
        if(idEncargado2){
            this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idEncargado2);
        }
    }


    async crearMiembroNuevo(idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo){
        var movimiento = this.getMovimiento(idMovimiento);
        if(movimiento.gMiembros.miembros.has(idMiembro)){
            throw {message: "Ya existe un miembro con ese id en el movimiento"}
        }
        await this.dao.insertarMiembro(idMovimiento, idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor)
        .catch(err => {
            throw err
        })
        await this.dao.insertarMiembroAGrupo(idGrupo, idMiembro, idRama, idZona, idMovimiento)
        .catch(err => {
            throw err
        })
        this.agregarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo);
    }

    async crearMiembroNuevoSinGrupo(idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor, idMovimiento){
        await this.dao.insertarMiembro(idMovimiento, idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);
        this.agregarMiembroAMovimiento(idMovimiento,idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);
    }

    async cambioDeGrupo(idMovimiento, idZona, idRama, idGrupoNuevo, idGrupoViejo, idMiembro){
        await this.dao.cambioMiembroGrupo(idMiembro, idGrupoViejo, idGrupoNuevo, idRama, idZona, idMovimiento);
        this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupoNuevo, idMiembro);
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.gNodos.eliminarDeGrupo(idZona, idRama, idGrupoViejo, idMiembro);
    }

    agregarMovimiento(cedulaJuridica, idAsesor,nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas, telefonos){
        this.movimientos.set(cedulaJuridica, new Movimiento(cedulaJuridica, idAsesor, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas));
        var mov = this.getMovimiento(cedulaJuridica);
        console.log(telefonos)
        for(var i in telefonos){
            mov.telefonos.push(telefonos[i].celular);
        }
    }

    agregarZona(idMovimiento, idZona, nombre, idEncargado1, idEncargado2){
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.gNodos.crearZona(idZona, nombre, idEncargado1, idEncargado2); 
    }

    agregarRama(idMovimiento, idZona, idRama, nombre, idEncargado1, idEncargado2){
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.gNodos.crearRama(idZona, idRama, nombre, idEncargado1, idEncargado2);
    }

    agregarGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, isMonitor, idEncargado1, idEncargado2){
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.gNodos.crearGrupo(idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isMonitor);
    }

    agregarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo, noticias) {
        this.agregarMiembroAMovimiento(idMovimiento,idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);
        this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro);
    }

    agregarMiembroAMovimiento(idMovimiento,idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor){
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.gMiembros.crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);
    }

    async agregarMiembroNuevoAGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro){
        await this.dao.insertarMiembroAGrupo(idGrupo, idMiembro, idRama, idZona, idMovimiento)
        this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro);
    }

    async eliminarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro){
        var movimiento = this.getMovimiento(idMovimiento);
        await this.dao.eliminarDeGrupo(idMiembro, idGrupo, idRama, idZona, idMovimiento);
        movimiento.gNodos.eliminarDeGrupo(idZona, idRama, idGrupo, idMiembro);
    }

    agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro){
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

    
    async modificarMovimiento(idMovimiento,nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas, telefonos){
        var movimiento = this.getMovimiento(idMovimiento);
        movimiento.telefonos = []
        for(var i in telefonos){
            movimiento.telefonos.push(telefonos[i]);
        }
        await this.dao.modificarMovimiento(idMovimiento, nombre, pais, provincia, canton, distrito, senas, direccionWeb, logo, movimiento.telefonos);
        movimiento.cedulaJuridica = idMovimiento;
        movimiento.nombre = nombre;
        movimiento.direccionWeb = direccionWeb;
        movimiento.logo = logo;
        movimiento.pais = pais;
        movimiento.provincia = provincia;
        movimiento.canton = canton;
        movimiento.distrito = distrito;
        movimiento.senas = senas;
    }

    async modificarZona(idMovimiento, idZona, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2){
        try{
            if(idJefeNuevo1 != idJefeViejo1 && idJefeViejo1 && idJefeNuevo2 != idJefeViejo1){
                await this.dao.eliminarJefeZona(idJefeViejo1,idZona, idMovimiento)
            }

            if(idJefeNuevo2 != idJefeViejo2 && idJefeViejo2 && idJefeNuevo1 != idJefeViejo2){
                await this.dao.eliminarJefeZona(idJefeViejo2,idZona, idMovimiento)
            }

            if(idJefeNuevo1 && idJefeNuevo1 != idJefeViejo1 && idJefeNuevo1 != idJefeViejo2){
                await this.dao.asignarJefeZona(idJefeNuevo1, idZona, idMovimiento)
            }
            
            if(idJefeNuevo2 && idJefeNuevo2 != idJefeViejo1 && idJefeNuevo2 != idJefeViejo2){
                await this.dao.asignarJefeZona(idJefeNuevo2, idZona, idMovimiento)
            }

            var zona = this.getZona(idMovimiento, idZona);
            if(zona.nombre != nombre){
                await this.dao.modificarZona(idMovimiento,idZona,nombre)
            }
            zona.nombre = nombre;
            zona.setEncargado1(idJefeNuevo1);
            zona.setEncargado2(idJefeNuevo2);
        }catch(err){
            throw err
        }
    }

    verificarEliminarJefe(nodo, idJefeViejo){
        if(nodo.encargado1 == idJefeViejo || nodo.encargado2 == idJefeViejo){
            var contador = 0;
            var composites = nodo.composites;
            composites.forEach((value, key) => {
                if(value.encargado1 == idJefeViejo) contador++;
                if(value.encargado2 == idJefeViejo) contador++;
            })
            if(contador == 1) throw {message: "No se puede eliminar el jefe "+idJefeViejo+" ya que es lider de un nodo superior"};
            
        }
    }

    async modificarRama(idMovimiento, idZona, idRama , nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2){
        try{
            var zona = this.getZona(idMovimiento, idZona);
            if(idJefeNuevo1 != idJefeViejo1 && idJefeViejo1 && idJefeNuevo2 != idJefeViejo1){
                this.verificarEliminarJefe(zona, idJefeViejo1);
                await this.dao.eliminarJefeRama(idJefeViejo1,idZona,idRama, idMovimiento)
            }
            if(idJefeNuevo2 != idJefeViejo2 && idJefeViejo2 && idJefeNuevo1 != idJefeViejo2){
                this.verificarEliminarJefe(zona, idJefeViejo2);
                await this.dao.eliminarJefeRama(idJefeViejo2,idZona, idRama, idMovimiento)
            }

            if(idJefeNuevo1 && idJefeNuevo1 != idJefeViejo1 && idJefeNuevo1 != idJefeViejo2){
                await this.dao.asignarJefeRama(idJefeNuevo1, idZona, idRama, idMovimiento)
            }
            
            if(idJefeNuevo2 && idJefeNuevo2 != idJefeViejo1 && idJefeNuevo2 != idJefeViejo2){
                await this.dao.asignarJefeRama(idJefeNuevo2,idZona,idRama, idMovimiento)
            }
            var rama = this.getRama(idMovimiento, idZona, idRama);
            if(rama.nombre != nombre){
                await this.dao.modificarRama(idMovimiento,idZona,idRama,nombre)
            }
            rama.nombre = nombre;
            rama.setEncargado1(idJefeNuevo1);
            rama.setEncargado2(idJefeNuevo2);
        }catch(err){
            throw err
        }
    }

    async modificarGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, isMonitor, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2){
        try{
            var movimiento = this.getMovimiento(idMovimiento);
            var rama = this.getRama(idMovimiento, idZona, idRama);
            var grupo = this.getGrupo(idMovimiento, idZona, idRama, idGrupo);
            if(idJefeNuevo1 != idJefeViejo1 && idJefeViejo1 && idJefeNuevo2 != idJefeViejo1){
                this.verificarEliminarJefe(rama,idJefeViejo1)
                await this.dao.eliminarJefeGrupo(idJefeViejo1,idZona,idRama, idGrupo, idMovimiento)
                if(grupo.isMonitor){
                    movimiento.gNodos.eliminarDeGrupo(idZona, idRama, idGrupo, idJefeViejo1);
                }
            }

            if(idJefeNuevo2 != idJefeViejo2 && idJefeViejo2 && idJefeNuevo1 != idJefeViejo2){
                this.verificarEliminarJefe(rama, idJefeViejo2)
                await this.dao.eliminarJefeGrupo(idJefeViejo2,idZona, idRama, idGrupo, idMovimiento)
                if(grupo.isMonitor){
                    movimiento.gNodos.eliminarDeGrupo(idZona, idRama, idGrupo, idJefeViejo2);
                }
            }
            

            if(idJefeNuevo1 && idJefeNuevo1 != idJefeViejo1 && idJefeNuevo1 != idJefeViejo2){
                if(isMonitor){
                    await this.dao.asignarMonitorGrupo(idJefeNuevo1,idZona, idRama, idGrupo, idMovimiento); 
                    this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idJefeNuevo1);
                }else{
                    await this.dao.asignarJefeGrupo(idJefeNuevo1, idZona, idRama, idGrupo, idMovimiento);
                }
            }
            
            if(idJefeNuevo2 && idJefeNuevo2 != idJefeViejo1 && idJefeNuevo2 != idJefeViejo2){
                if(isMonitor){
                    await this.dao.asignarMonitorGrupo(idJefeNuevo2,idZona, idRama, idGrupo, idMovimiento);
                    this.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idJefeNuevo2);
                }else{
                    await this.dao.asignarJefeGrupo(idJefeNuevo2, idZona, idRama, idGrupo, idMovimiento);
                }
            }
            
            if(grupo.nombre != nombre || grupo.isMonitor != isMonitor){
                await this.dao.modificarGrupo(idMovimiento,idZona,idRama, idGrupo, isMonitor, nombre)
            }
            grupo.nombre = nombre;
            grupo.isMonitor = isMonitor;
            grupo.setEncargado1(idJefeNuevo1);
            grupo.setEncargado2(idJefeNuevo2);
        }catch(err){
            throw err
        }
    }

    async modificarAsesor(idMovimiento, idAsesor, contrasena, nombre, email, celular, provincia, distrito, canton, senales){
        await this.dao.editarAsesor(canton, idAsesor, celular, contrasena, distrito, nombre, provincia, senales, email);
        var movimiento = this.getMovimiento(idMovimiento);
        var gMiembros = movimiento.gMiembros;
        gMiembros.modificarMiembro(idAsesor, nombre, celular, email, provincia, canton, distrito, senales, false);
    }

    async modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento){
        await this.dao.modificarMiembro(idMovimiento, idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor);
        var movimiento =  this.getMovimiento(idMovimiento);
        var gMiembros = movimiento.gMiembros;
        gMiembros.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor)
    }

    async modificarContrasena(idMiembro, contrasena){
        await this.dao.modificarContrasena(idMiembro, contrasena);
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

    async consultarZonasLider(idMovimiento, idMiembro){
        var zonas = await this.dao.zonasDeLider(idMiembro, idMovimiento);
        return zonas;
    }

    async consultarRamasLider(idMovimiento, idZona, idMiembro){
        var ramas = await this.dao.ramasDeLider(idMiembro, idMovimiento, idZona);
        return ramas;
    }

    async consultarGruposLider(idMovimiento, idZona, idRama, idMiembro,){
        var grupos = await this.dao.gruposDeLider(idMiembro, idMovimiento, idZona, idRama);
        return grupos;
    }

    async consultarGruposMiembro(idMovimiento, idZona, idRama, idMiembro){
        var grupos = await this.dao.gruposDeMiembro(idMiembro, idMovimiento, idZona, idRama)
        return grupos
    }

    async consultarZonasMiembro(idMovimiento, idMiembro){
        var zonas = await this.dao.zonasMiembro(idMiembro, idMovimiento);
        return zonas;
    }

    async consultarRamasMiembro(idMovimiento, idMiembro){
        var ramas = await this.dao.ramasDeMiembros(idMiembro, idMovimiento);
        return ramas;
    }

    async consultarTodasLasRamasMiembro(idMovimiento, idZona, idMiembro){
        var ramas = await this.dao.todasRamasDeMiembro(idMiembro, idMovimiento, idZona);
        return ramas;
    }

    async consultarTodosLosGruposMiembro(idMovimiento, idMiembro){
        var grupos = await this.dao.todosGruposDeMiembro(idMiembro, idMovimiento);
        return grupos;
    }


    async consultarRamasDisponibles(idMovimiento, idMiembro){
        try{
            var ramas = this.dao.otrasRamas(idMiembro, idMovimiento)
            return ramas;
        }catch(err){
            throw err
        }
    }

    consultarGrupos(idMovimiento, idZona, idRama){
        var movimiento = this.getMovimiento(idMovimiento);
        return movimiento.gNodos.consultarGrupos(idZona, idRama);
    }

    async consultarGrupoDeMiembroEnRama(idMovimiento, idZona, idRama, idMiembro){
        var grupos = await this.dao.grupoDeMiembroEnRama(idMovimiento, idZona, idRama, idMiembro);
        return grupos;
    }

    consultarMiembrosGrupo(idMovimiento, idZona, idRama, idGrupo){
        var movimiento = this.getMovimiento(idMovimiento);
        var grupo = this.getGrupo(idMovimiento, idZona, idRama, idGrupo);
        var miembros = movimiento.gNodos.consultarMiembrosGrupo(idZona, idRama, idGrupo);
        if(grupo.encargado1 && !miembros.has(grupo.encargado1)){
            miembros.set(grupo.encargado1,this.getMiembro(idMovimiento, grupo.encargado1));
        }
        if(grupo.encargado2 && !miembros.has(grupo.encargado2)){
            miembros.set(grupo.encargado2,this.getMiembro(idMovimiento, grupo.encargado2));
        }
        return miembros;
    }

    consultarMiembrosRama(idMovimiento, idZona, idRama){
        var movimiento = this.getMovimiento(idMovimiento);
        var rama = this.getRama(idMovimiento, idZona, idRama);
        var idMiembros = movimiento.gNodos.consultarMiembrosNodo(rama);
        var miembros = []
        idMiembros.forEach(id =>{
            miembros.push(this.getMiembro(idMovimiento, id));
        })
        return miembros;
    }

    consultarMiembrosZona(idMovimiento, idZona){
        var movimiento = this.getMovimiento(idMovimiento);
        var zona = this.getZona(idMovimiento, idZona);
        var idMiembros = movimiento.gNodos.consultarMiembrosNodo(zona);
        var miembros = [];
        idMiembros.forEach(id =>{
            miembros.push(this.getMiembro(idMovimiento, id));
        })
        return miembros;
    }

    async consultarMonitoresProbables(idMovimiento, idZona, idRama, idGrupo){
        var monitores = await this.dao.monitoresProbables(idMovimiento, idZona, idRama, idGrupo);
        return monitores;
    }

    async consultarMonitoresZona(idMovimiento, idZona){
        var monitores = await this.dao.todosLosMonitores(idMovimiento, idZona);
        return monitores;
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
            const res = await this.dao.getGruposXMiembro(idMiembro, idMovimiento);
            for(var i in res){
                var grupoInfo = res[i];
                grupos.push(grupoInfo);
            }
            return grupos
        }catch(err){
            throw err
        }
    }

    async getMovimientos(){
        try{
            var movimientos = await this.dao.getMovimientos(); 
            return movimientos;
        }catch(err){
            throw err;
        }
    }

    async getMovimientosMiembro(idMiembro){
        try{
            var movimientos = await this.dao.getMovimientosXMiembro(idMiembro);
            return movimientos;
        }catch(err){
            throw err;
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

    async crearNoticia(idEmisor, titulo, contenido, imagenes, idMovimiento, idZona, idRama, idGrupo, tipo){
        var movimiento = this.getMovimiento(idMovimiento);
        var receptores;
        if(tipo == "GRUPO"){
            var grupo = this.getGrupo(idMovimiento, idZona, idRama, idGrupo);
            receptores = movimiento.gNodos.consultarTodosLosMiembrosNodo(grupo)
        }else if(tipo == "RAMA"){
            var rama = this.getRama(idMovimiento, idZona, idRama);
            receptores = movimiento.gNodos.consultarTodosLosMiembrosNodo(rama)
        }else if(tipo == "ZONA"){
            var zona = this.getZona(idMovimiento, idZona)
            receptores = movimiento.gNodos.consultarTodosLosMiembrosNodo(zona)
        }else if(tipo == "MOVIMIENTO"){
            receptores = movimiento.gNodos.consultarMiembrosMovimiento();
        }else{
            throw { message: "No se tiene la información necesaria para crear noticia."}
        }
        console.log(receptores);
        var idNoticia= await this.centroNotificaciones.crearNoticia(idEmisor,titulo,contenido,idMovimiento,idZona,idRama,idGrupo,receptores,imagenes);
        gestorMiembros=movimiento.gMiembros;
        return idNoticia
        //centroNotificaciones.actualizarNotificacionesMiembros(receptores,gestorMiembros,idNoticia);
    }

    async leerNoticia(idNoticia, idMiembro){
        await this.dao.noticiaLeida(idNoticia, idMiembro)
    }

    getNoticiasMiembro(idMiembro,idMovimiento){
        return this.centroNotificaciones.getNoticiasMiembro(idMiembro,idMovimiento)
    }

    getNoticiasPublicadas(pIdMovimiento,pIdMiembro){
        return this.centroNotificaciones.obtenerNoticiasPublicadas(pIdMovimiento,pIdMiembro);
    }

    async obtenerNoticias(idMovimiento, idMiembro){
        var miembro = this.getMiembro(idMovimiento, idMiembro);
        var resultado=[]
        var arrayNoticias = miembro.noticias;
        for(var i in arrayNoticias){
            var noticia = await this.dao.getNoticia(arrayNoticias[i]);
            resultado.push(noticia);
        }
        return resultado;
    }
    
    async publicarAporte(pTipo,pContenido,pIdEmisor,pIdMovimiento){
        //Tipo= Agradecimiento || Petitoria || Ofrecimiento
        return await this.dao.crearAporte(pTipo,pContenido,pIdEmisor,pIdMovimiento)
    }

    async getReporte(pTipo){
        //General o Tipado
        return this.centroNotificaciones.notificarReporte(pTipo);
    }
}
