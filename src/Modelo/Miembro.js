import Component from "./Component";

export default class Miembro extends Component{
    constructor(id, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor){
        super(id, nombre);
        this.celular = celular;
        this.email = email;
        this.provincia = provincia;
        this.canton = canton;
        this.distrito = distrito;
        this.senas = senas;
        this. posible_monitor = posible_monitor;
    }

    
}