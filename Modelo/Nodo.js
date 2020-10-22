import Component from "./Component"

export default class Nodo extends Component{
    constructor(id, nombre, encargado1, encargado2, isJefe){
        super(id, nombre)
        this.composites = new Map();
        this.encargado1 = encargado1;
        this.encargado2 = encargado2;
        this.isJefe = isJefe;
    }

    agregar(registro){
        if(this.composites.has(registro.id)){
            throw {message: "Ya existe un nodo con la identificación "+registro.id}
        }
        this.composites.set(registro.id, registro);
    }

    buscar(llave){
        var nodo = this.composites.get(llave)
        return nodo;
    }

    modificar(registro){

    }

    eliminar(llave){

    }
}