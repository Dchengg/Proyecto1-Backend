import Component from "./Component"

export default class Nodo extends Component{
    constructor(id, nombre, encargado1, encargado2, isMonitor){
        super(id, nombre)
        this.composites = new Map();
        if(encargado1){
            this.encargado1 = encargado1;
        }
        if(encargado2){
            this.encargado1 = encargado1;
        }
        this.isMonitor = isMonitor;
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

    asignarEncargados(miembro, miembro2, isMonitor){
        if(miembro){
            this.encargado1 = miembro;
        }
        if(miembro2){
            this.encargado2 = miembro2;
        }
        this.isMonitor = isMonitor;
    }

    setEncargado1(idEncargado1){
        if(idEncargado1){
            this.encargado1 = idEncargado1;
        }
    }

    setEncargado2(idEncargado2){
        if(idEncargado2){
            this.encargado2 = idEncargado2;
        }
    }
}