export default class ReporteTipadoStrategy{
    async reportar(){
        var dao=new DAO();
        return await dao.getReporteTipo();
    }
}