import Nodo from '../Modelo/Nodo'

class GestorNodo{
    constructor(){
        this.zonas = new Map();
    }

    crearZona(idZona, nombre){
        if(this.zonas.has(idZona)){
            throw {message: "Ya hay una zona con ese id"}
        }
        this.zonas.set(idZona, new Nodo(idZona, nombre));
    }
}