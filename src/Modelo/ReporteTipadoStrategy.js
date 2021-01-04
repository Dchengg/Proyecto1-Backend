export default class ReporteTipadoStrategy{
    async reportar(idMovimiento){
        var dao=new DAO();
        return await dao.getReporteTipo(idMovimiento);
    }
}