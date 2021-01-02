import Miembro from "../Modelo/Miembro";

export default class GestorMiembros{
    constructor(){
        this.miembros = new Map();
    }

    crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor) {
        if(this.miembros.has(idMiembro)){
            console.log("Ya hay un miembro con esa cedula")
            console.log(this.miembros.get(idMiembro))
        }else{
            const miembro =  new Miembro(idMiembro , nombre, celular, email, provincia, canton, distrito, senas, posible_monitor)
            this.miembros.set(idMiembro, miembro);
            return miembro;
        }
    }

    modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor) {
        const miembro =  this.miembros.get(idMiembro);
        if(miembro == null) throw { message: "no existe el miembro "+ idMiembro }
        miembro.nombre = nombre;
        miembro.celular = celular;
        miembro.email = email;
        miembro.provincia = provincia;
        miembro.canton =canton;
        miembro.distrito = distrito;
        miembro.senas = senas;
        miembro.posible_monitor = posible_monitor;
        return miembro;
    }


    getMiembro(idMiembro){
        if(this.miembros.has(idMiembro)){
            return this.miembros.get(idMiembro);
        }
        throw { message: "No existe el miembro " + idMiembro}
    }
}