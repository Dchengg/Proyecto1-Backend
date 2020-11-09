import DAO from "./DAO";
import Creador from '../Modelo/Creador';


export default class ControladorLogin{
    constructor(controlador){
        this.sesiones = new Map();
        this.dao = new DAO();
        this.creador = new Creador(controlador);
        
    }

    async verificarCombinación(id, pass, tipo){
        try {
            const res = await this.dao.loginAsesor(id, pass);
            var idMovimiento;
            if (res[0].encontrado) {
                idMovimiento=await this.creador.cargarMovimiento(id);
            }
            Promise.resolve(idMovimiento);
            res[0].idMovimiento=idMovimiento;
            return res[0];
        }
        catch (err) {
            throw err;
        }
    }
}