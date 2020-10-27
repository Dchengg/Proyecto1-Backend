import DAO from "./DAO";
import Creador from '../Modelo/Creador';


export default class ControladorLogin{
    constructor(controlador){
        this.sesiones = new Map();
        this.dao = new DAO();
        this.creador = new Creador(controlador);
    }

    async verificarCombinacion(id, pass, tipo){
        try {
            const res = await this.dao.loginAsesor(id, pass);
            if (res[0].encontrado) {
                this.creador.cargarMovimiento(id);
            }
            return res[0].encontrado;
        }
        catch (err) {
            throw err;
        }
    }
}