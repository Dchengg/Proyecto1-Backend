import Movimiento from './Movimiento.js';
import ControladorLogin from './ControladorLogin'

export default class Controlador{
    constructor(){
        this.movimientos = new Map();
        this.movimientos.set(1,new Movimiento("1","123","movimiento","http:..","cool","CR","SJ","P","C","D","Del palo de limón, tres cuadras norte :v"))
    }

    crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo) {
        try{
            if(this.movimientos.has(1)){
                this.movimientos.get(1).gMiembros.crearMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo);
            }else{
                throw { message: "Movimiento no existe"}
            }
           
        }
        catch(err){
            throw err
        }
    }
}
