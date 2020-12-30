export default class ReporteTipadoStrategy{
    reportar(){
        var dao=new DAO();
        return dao.getNoticiasTipo();
    }
}