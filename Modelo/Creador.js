import DAO from '../Controlador/DAO'
import Controlador from '../Controlador/Controlador'

export default class Creador{
    constructor(controlador){
        this.dao = new DAO();
        this.controlador = controlador;
    }

    iniciarAPI(){

    }

    cargarZonas(idMovimiento){
        this.dao.getZonas()
            .then(res => {
                console.log(res);
                for(var i in res){
                    try{
                        this.controlador.crearZona(res[i].id_zona, res[i].nombre);
                    }catch(err){
                        console.log(err);
                    }
                }
            })
    }
}   