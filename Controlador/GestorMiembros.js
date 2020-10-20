import Miembro from "../Modelo/Miembro";

export default class GestorMiembros{
    constructor(){
        this.miembros = new Map();
    }

    crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor) {
        try{
            const miembro =  new Miembro(nombre, celular, email, provincia, canton, distrito, senas, posible_monitor)
            this.miembros.set(idMiembro, miembro);
        }
        catch(err) {
            console.log(err);
            throw {message: "Error a la hora de agregar el miembro"};
        }
    }
}