import ReporteGeneralStrategy from "../Modelo/ReporteGeneralStrategy";

//import DAO from './DAO'
export default class CentroNotificacionesPublicador{
//class CentroNotificacionesPublicador{
    constructor(pDao){
        this.dao = pDao;
        //this.reporteStrategy = pReporteStrategy;
    }

    crearNoticia(idEmisor,tituloNoticia, detallesNoticia,idMovimiento, idZona, idRama, idGrupo,receptores){
        //Falta imagen
        var resNoticia=this.dao.crearNoticia(tituloNoticia,detallesNoticia, idEmisor, idMovimiento,idZona,idRama,idGrupo);
        //Luego aqui se pega la noticia a los receptores
        var idNoticia=resNoticia[0].crearNoticia;
        this.dao.insertarNoticiaXMiembros(idNoticia,receptores,idMovimiento);
        //this.actualizarNotificacionesMiembros(receptores,null,idNoticia);
        return idNoticia;
    }
    
    notificarReporte(tipo){
        if(tipo=="General"){
            var reporte=new ReporteGeneralStrategy();
            return reporte.reportar();
        }else{
            var reporte=new ReporteTipadoStrategy();
            return reporte.reportar();
        }
    }

    actualizarNotificacionesMiembros(miembros,gestorMiembros,idNoticia){
        //Pasa por el gestor de miembros y le dice que los miembros tienen idNoticia
    }

    obtenerNoticias(idMiembro,idMovimiento){
        //Query para obtener las noticias del miembro
        return this.dao.getNoticiasMiembro(idMiembro,idMovimiento)
    }
}

//var centro=new CentroNotificacionesPublicador(new DAO());
//centro.crearNoticia('117940925',"TITULO","DETALLES",'4000042145',1,1,123,"")