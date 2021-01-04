export default class ReporteGeneralStrategy{
    async reportar(){
        var dao=new DAO();
        return await dao.getAllReportes(idMovimiento);
    }
}