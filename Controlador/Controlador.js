import Movimiento from './Movimiento.js';
import ControladorLogin from './ControladorLogin'

export default class Controlador{
    constructor(){
        this.movimientos = new Map();
        this.movimientos.set(1,new Movimiento("1","123","movimiento","http:..","cool","CR","SJ","P","C","D","Del palo de limón, tres cuadras norte :v"))
    }
     

    crearZona(idZona, nombre){
        if(this.movimientos.has(1)){
            this.movimientos.get(1).gNodos.crearZona(idZona, nombre); 
        }else{
            throw { message: "Movimiento no existe"}
        }
    }

    crearRama(idZona, idRama, nombre){
        this.movimientos.get(1).gNodos.crearRama(idZona, idRama, nombre);
    }

    crearGrupo(idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2){
        try{
            var encargado1 = this.getMiembro(idEncargado1);
            var encargado2 = this.getMiembro(idEncargado2);
        }catch(err){
            console.log(err);
        }
        this.movimientos.get(1).gNodos.crearGrupo(idZona, idRama, idGrupo, nombre, encargado1, encargado2);
    }

    crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo) {
        if(this.movimientos.has(1)){
            var gMiembros = this.movimientos.get(1).gMiembros;
            var gNodos = this.movimientos.get(1).gNodos; 
            var miembro = gMiembros.crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo);
            gNodos.agregarMiembro(idZona, idRama, idGrupo, miembro);
        }else{
            throw { message: "Movimiento no existe"};
        }
    }

    modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo){
        var gMiembros = this.movimientos.get(1).gMiembros;
        var miembro = gMiembros.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor)
    }

    consultarZonas(){
        if(this.movimientos.has(1)){
            return this.movimientos.get(1).gNodos.zonas; 
        }else{
            throw { message: "Movimiento no existe"}
        }
    }

    consultarRamas(idZona){
        if(this.movimientos.has(1)){
            return this.movimientos.get(1).gNodos.consultarRamas(idZona); 
        }else{
            throw { message: "Movimiento no existe"}
        }
    }

    consultarGrupos(idZona, idRama){
        return this.movimientos.get(1).gNodos.consultarGrupos(idZona, idRama);
    }

    consultarMiembrosGrupo(idZona, idRama, idGrupo){
        return this.movimientos.get(1).gNodos.consultarMiembrosGrupo(idZona, idRama, idGrupo);
    }

    consultarMiembrosRama(idZona, idRama, idGrupo){
        return this.movimientos.get(1).gNodos.consultarMiembrosGrupo(idZona, idRama);
    }

    getMiembro(idMiembro){
        if(this.movimientos.has(1)){
            var miembro = this.movimientos.get(1).gMiembros.getMiembro(idMiembro);
            if(miembro){
                return miembro
            }else{
                throw { message: "No existe ningún miembro con esa cedula"}
            }
        }else{
            throw { message: "Movimiento no existe"}
        }
    }

    getZona(idZona){
        var zona = this.movimientos.get(1).gNodos.getZona(idZona);
        if(zona == null){
            throw { message: "No existe una zona con esa identificación"}
        }
        return zona;
    }

    getRama(idZona, idRama){
        var rama = this.movimientos.get(1).gNodos.getRama(idZona, idRama);
        if(rama == null){
            throw { message: "No existe una zona con esa identificación"}
        }
        return rama;
    }

    getGrupo(idZona, idRama, idGrupo){
        var grupo = this.movimientos.get(1).gNodos.getGrupo(idZona, idRama, idGrupo);
        if(grupo == null){
            throw { message: "No existe una grupo con esa identificación"}
        }
        return grupo;
    }

    
}
