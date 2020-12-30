export default class ReporteGeneralStrategy{
    reportar(){
        var dao=new DAO();
        return dao.getAllNoticias();
    }
}