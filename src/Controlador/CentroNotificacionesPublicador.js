import ReporteGeneralStrategy from "../Modelo/ReporteGeneralStrategy";

//import DAO from './DAO'
export default class CentroNotificacionesPublicador{
//class CentroNotificacionesPublicador{
    constructor(pDao){
        this.dao = pDao;
        //this.reporteStrategy = pReporteStrategy;
    }

    async crearNoticia(idEmisor,tituloNoticia, detallesNoticia,idMovimiento, idZona, idRama, idGrupo,receptores){
        //Falta imagen
        var resNoticia = await this.dao.crearNoticia(tituloNoticia,detallesNoticia, idEmisor, idMovimiento,idZona,idRama,idGrupo);
        //Luego aqui se pega la noticia a los receptores
        var idNoticia=resNoticia[0].crearnoticia;
        var idMiembros = [ ...receptores.keys() ];
        await this.dao.insertarNoticiaXMiembros(idNoticia,idMiembros,idMovimiento);
        this.actualizarNotificacionesMiembros(receptores,idNoticia);
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

    actualizarNotificacionesMiembros(miembros,idNoticia){
        miembros.forEach(function(value, key){
            value.noticias.push(idNoticia);
        })
    }

    async obtenerNoticias(idMiembro,idMovimiento){
        //Query para obtener las noticias del miembro
        return await this.dao.noticiaRecibidasMiembro(idMiembro,idMovimiento)
    }

    async obtenerNoticiasPublicadas(pIdMovimiento,pIdMiembro){
        return await this.dao.noticiasMiembro(pIdMovimiento,pIdMiembro)
    }
}

//var centro=new CentroNotificacionesPublicador(new DAO());
//centro.crearNoticia('117940925',"TITULO","DETALLES",'4000042145',1,1,123,"")