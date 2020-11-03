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

    crearZona(idMovimiento, idZona, nombre){
        if(this.movimientos.has(idMovimiento)){
            this.movimientos.get(idMovimiento).gNodos.crearZona(idZona, nombre); 
        }else{
            throw { message: "Movimiento no existe " + idMovimiento}
        }
    }

    crearRama(idMovimiento, idZona, idRama, nombre){
        this.movimientos.get(idMovimiento).gNodos.crearRama(idZona, idRama, nombre);
    }

    crearGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isJefe){
        try{
            var encargado1 = this.getMiembro(idEncargado1);
            var encargado2 = this.getMiembro(idEncargado2);
        }catch(err){
            console.log("encargado no valido");
        }
        this.movimientos.get(idMovimiento).gNodos.crearGrupo(idZona, idRama, idGrupo, nombre, encargado1, encargado2);
    }

    crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo) {
        if(this.movimientos.has(idMovimiento)){
            var gMiembros = this.movimientos.get(idMovimiento).gMiembros;
            var gNodos = this.movimientos.get(idMovimiento).gNodos; 
            var miembro = gMiembros.crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo);
            gNodos.agregarMiembro(idZona, idRama, idGrupo, miembro);
        }else{
            throw { message: "Movimiento no existe"};
        }
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
        if(this.movimientos.has(idMovimiento)){
            return this.movimientos.get(idMovimiento).gNodos.consultarRamas(idZona); 
        }else{
            throw { message: "Movimiento no existe"}
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
                var grupo = this.getGrupo(idMovimiento, grupoInfo.id_zona.toString(),grupoInfo.id_rama.toString(), grupoInfo.id_grupo.toString());
                grupos.push(grupo);
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
