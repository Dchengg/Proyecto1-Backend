import Component from "./Component"

class Nodo extends Component{
    constructor(id, nombre, encargado1, encargado2, isJefe){
        super(id, nombre)
        composites = this.map();
        this.encargado1 = encargado1;
        this.encargado2 = encargado2;
        this.isJefe = isJefe;
    }

    agregar(registro){

    }

    buscar(llave){

    }

    modificar(registro){

    }

    eliminar(llave){

    }
}