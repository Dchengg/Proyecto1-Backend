import DAO from "./DAO";
import Creador from '../Modelo/Creador';


export default class ControladorLogin{
    constructor(controlador){
        this.sesiones = new Map();
        this.dao = new DAO();
        this.creador = new Creador(controlador);
        
    }

    async verificarCombinación(id, pass, idMovimiento){
        try {
            var movimientos = await this.dao.getMovimientos();
            if(movimientos.find(element => element.id_movimiento == idMovimiento)){
                var userType = await this.dao.inicioSesion(id, pass, idMovimiento);
                //await this.creador.cargarMovimiento(idMovimiento);
                if(userType[0].encontrado){
                    return "Asesor";
                }else{
                    return this.obtenerPermisos(id, idMovimiento);
                }
            }else{
                throw { message: "Movimiento no existe " + idMovimiento}
            }
            /*var idMovimiento;
            if (res[0].encontrado) {
                idMovimiento=await this.creador.cargarMovimiento(id);
            }*/
            //this.creador.cargarMovimiento(id);
            //Promise.resolve(idMovimiento);
            //res[0].idMovimiento=idMovimiento;
            //return res[0];
        }
        catch (err) {
            throw err;
        }
    }

    
    async obtenerPermisos(idMiembro, idMovimiento){
        var rolesUsuario = await this.dao.getGruposMiembroxMiembro(idMiembro, idMovimiento);
        var prioridad = [4,3,2,1,5];
        var nombre_rol;
        var contador = 0;
        while(contador < prioridad.length){
            var roles = rolesUsuario.find(rol => rol.id_lider == prioridad[contador]);
            if(roles){
                nombre_rol = roles.nombre_lider
                break;
            }
            contador++;
        }
        return nombre_rol;
    }

}