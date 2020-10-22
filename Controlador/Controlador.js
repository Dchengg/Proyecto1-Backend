import Movimiento from './Movimiento.js';
import ControladorLogin from './ControladorLogin'

export default class Controlador{
    constructor(){
        this.movimientos = new Map();
        this.movimientos.set(1,new Movimiento("1","123","movimiento","http:..","cool","CR","SJ","P","C","D","Del palo de limón, tres cuadras norte :v"))
    }

    crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo) {
        if(this.movimientos.has(1)){
            this.movimientos.get(1).gMiembros.crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo);
        }else{
            throw { message: "Movimiento no existe"};
        }
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

    crearGrupo(idZona, idRama, idGrupo, nombre){
        this.movimientos.get(1).gNodos.crearGrupo(idZona, idRama, idGrupo, nombre);
    }

    consultarZona(idZona){
        var zona = this.movimientos.get(1).gNodos.getZona(idZona);
        if(zona == null){
            throw { message: "No existe una zona con esa identificación"}
        }
        return zona;
    }

    consultarRama(idZona, idRama){
        var rama = this.movimientos.get(1).gNodos.getRama(idZona, idRama);
        if(rama == null){
            throw { message: "No existe una zona con esa identificación"}
        }
        return rama;
    }

    consultarGrupo(idZona, idRama, idGrupo){
        var grupo = this.movimientos.get(1).gNodos.getGrupo(idZona, idRama, idGrupo);
        if(grupo == null){
            throw { message: "No existe una grupo con esa identificación"}
        }
        return grupo;
    }

    consultarMiembro(idMiembro){
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
}
