import Nodo from '../Modelo/Nodo'

export default class GestorNodos{
    constructor(){
        this.zonas = new Map();
    }

    crearZona(idZona, nombre){
        if(this.zonas.has(idZona)){
            throw {message: "Ya hay una zona con ese id"}
        }
        this.zonas.set(idZona, new Nodo(idZona, nombre));
    }

    crearRama(idZona, idRama, nombre){
        var zona = this.getZona(idZona);
        zona.agregar(new Nodo(idRama, nombre));
    }

    crearGrupo(idZona, idRama, idGrupo, nombre){
        var rama = this.getRama(idZona, idRama)
        rama.agregar(new Nodo(idGrupo, nombre));
    }

    getZona(idZona){
        var zona = this.zonas.get(idZona);
        if(zona == null) throw {message: "No existe la zona consultada"}
        return zona;
    }

    getRama(idZona, idRama){
        var zona = this.getZona(idZona);
        var rama = zona.buscar(idRama);
        if(rama == null) throw { message: "No existe la rama consultada"}
        return rama;
    }
    
    getGrupo(idZona, idRama, idGrupo){
        var rama = this.getRama(idZona, idRama);
        var grupo = rama.buscar(idGrupo);
        if(grupo == null) throw { message: "No existe el grupo consultado"}
        return grupo;
    }
}