import DAO from '../Controlador/DAO'
export default class ReporteGeneralStrategy{
    async reportar(idMovimiento){
        var dao=new DAO();
        return await dao.getAllReportes(idMovimiento);
    }
}