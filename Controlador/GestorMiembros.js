import Miembro from "../Modelo/Miembro";

class GestorMiembros{
    constructor(){
        this.miembros = new Map();
    }

    crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor) {
        try{
            this.miembros.set(idMiembro, new Miembro(nombre, celular, email, provincia, canton, distrito, senas, posible_monitor));
        }
        catch(err) {
            console.log("ERROR (GestorMiembro) : " + err)
        }
    }
}