import Nodo from '../Modelo/Nodo'
import Miembro from '../Modelo/Miembro'

export default class GestorNodos{
    constructor(){
        this.zonas = new Map();
    }

    crearZona(idZona, nombre, idEncargado1, idEncargado2){
        if(this.zonas.has(idZona)){
            throw {message: "Ya hay una zona con ese id"}
        }
        this.zonas.set(idZona, new Nodo(idZona, nombre, idEncargado1, idEncargado2, false));
    }

    crearRama(idZona, idRama, nombre, idEncargado1, idEncargado2){
        var zona = this.getZona(idZona);
        zona.agregar(new Nodo(idRama, nombre, idEncargado1, idEncargado2, false));
    }

    agregarMiembro(idZona, idRama, idGrupo, miembro){
        var grupo = this.getGrupo(idZona, idRama, idGrupo);
        grupo.agregar(miembro); 
    }

    crearGrupo(idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isMonitor){
        var rama = this.getRama(idZona, idRama)
        rama.agregar(new Nodo(idGrupo, nombre, idEncargado1, idEncargado2, isMonitor))
    }

    consultarRamas(idZona){
        var zona = this.getZona(idZona);
        return zona.composites;
    }

    eliminarDeGrupo(idZona, idRama, idGrupo, idMiembro){
        var grupo = this.getGrupo(idZona, idRama, idGrupo);
        grupo.eliminar(idMiembro);
    }

    consultarGrupos(idZona, idRama){
        var rama = this.getRama(idZona, idRama);
        return rama.composites;
    }

    consultarMiembrosGrupo(idZona, idRama, idGrupo){
        var grupo = this.getGrupo(idZona, idRama, idGrupo);
        return grupo.composites;
    }

    consultarMiembrosNodo(nodo){
        var miembros = []
        var nodos = nodo.composites;
        nodos.forEach( function(value, key ) {
            if(value.encargado1 && !miembros.find(element => element == value.encargado1)){
                miembros.push(value.encargado1)
            }
            if(value.encargado2 && !miembros.find(element => element == value.encargado2)){
                miembros.push(value.encargado2)
            }
        });
        return miembros;
    }

    consultarTodosLosMiembrosNodo(nodo){
        var miembros = new Map();
        var nodos = nodo.composites;
        if( nodos.values().next().value instanceof Miembro){
           return nodos
        }
        var self = this;
        nodos.forEach(function(value, key){
            var miembrosNodo = self.consultarTodosLosMiembrosNodo(value);
            miembrosNodo.forEach(function(value, key){
                if(!miembros.has(key)){
                    miembros.set(key,value);
                }
            })
        })
        return miembros;
    }

    consultarMiembrosMovimiento(){
        var miembros = new Map();
        var self = this;
        this.zonas.forEach(function(zona, Zonakey){
            var miembrosNodo = self.consultarTodosLosMiembrosNodo(zona);
            miembrosNodo.forEach(function(value, key){
                if(!miembros.has(key)){
                    miembros.set(key,value);
                }
            })
        })
        return miembros;
    }

    
    getZona(idZona){
        var zona = this.zonas.get(idZona);
        if(zona == null) throw {message: "No existe la zona consultada " + idZona}
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