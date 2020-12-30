export default class CentroNotificacionesPublicador{
    constructor(pDao){
        this.dao = pDao;
        //this.reporteStrategy = pReporteStrategy;
    }

    crearNoticia(idEmisor,idMovimiento, idZona, idRama, idGrupo, detallesNoticia,receptores){
        //Falta imagen
        this.dao.crearNoticia(detallesNoticia, idEmisor, idMovimiento,idZona,idRama,idGrupo);
        //Luego aqui se pega la noticia a los receptores
        //Luego aqui llama actualizarNotificacionesMiembros
    }
    
    notificarReporte(tipo){
        if(tipo=="General"){
        }else{
        }
    }

    actualizarNotificacionesMiembros(miembros,gestorMiembros,idNoticia){
        //Pasa por el gestor de miembros y le dice que los miembros tienen idNoticia
    }

    obtenerNoticias(idMiembro){
        //Query para obtener las noticias del miembro
    }
}