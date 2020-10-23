import Miembro from "../Modelo/Miembro";

export default class GestorMiembros{
    constructor(){
        this.miembros = new Map();
    }

    crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor) {
        if(this.miembros.has(idMiembro)){
            throw { message: "Ya hay un miembro con esa cedula"}
        }
        const miembro =  new Miembro(nombre, celular, email, provincia, canton, distrito, senas, posible_monitor)
        this.miembros.set(idMiembro, miembro);
        return miembro;
    }

    getMiembro(idMiembro){
        return this.miembros.get(idMiembro);
    }
}