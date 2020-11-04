import DAO from '../Controlador/DAO'
import Controlador from '../Controlador/Controlador'
import Movimiento from '../Controlador/Movimiento';

export default class Creador{
    constructor(controlador){
        this.dao = new DAO();
        this.controlador = controlador;
    }

    iniciarAPI(cedulaAsesor, contrasena){
        this.dao.loginAsesor(cedulaAsesor,contrasena)
        .then( res => {
            if(res[0].encontrado){
                this.cargarMovimiento(cedulaAsesor);
            }
            throw { message: "Datos incorrectos"}
        })
        .catch(err => {
            console.log(err);
        })
    }

    cargarMovimiento(cedulaAsesor){
        this.dao.getMovimientoXAsesor(cedulaAsesor)
            .then(res => {
                var movimiento = res[0];
                try{
                    this.controlador.crearMovimiento(movimiento.cedula_juridica, cedulaAsesor, movimiento.nombre, movimiento.direccion_web, movimiento.logo, movimiento.pais, movimiento.provincia, movimiento.canton, movimiento.distrito, movimiento.senales);
                    this.cargarZonasMovimiento(movimiento.cedula_juridica);
                    return movimiento.cedula_juridica;
                }catch(err){
                    console.log(err);
                }
            })
        
    }

    cargarZonasMovimiento(idMovimiento){
        console.log(idMovimiento)
        this.dao.getZonaXMovimiento(idMovimiento)
            .then(res => {
                for(var i in res){
                    var zona = res[i]
                    try{
                        this.controlador.crearZona(idMovimiento, zona.id_zona.toString(), zona.nombre);
                    }catch(err){
                        console.log(err);
                    }
                }
                this.cargarRamasMovimiento(idMovimiento);
            })
    }

    cargarRamasMovimiento(idMovimiento){
        this.dao.getRamaXMovimiento(idMovimiento)
            .then(res => {
                for(var i in res){
                    try{
                        var rama = res[i];
                        this.controlador.crearRama(idMovimiento, rama.id_zona.toString(), rama.id_rama.toString(), rama.nombre);
                    }catch(err){
                        console.log(err);
                    }
                }
                //this.cargarMiembrosMovimiento(idMovimiento);
                this.cargarGruposMovimiento(idMovimiento);
            })
    }

    cargarGruposMovimiento(idMovimiento){
        this.dao.getGrupoXMovimiento(idMovimiento)
            .then(res => {
                for(var i in res){
                    try{
                        var grupo = res[i];
                        this.controlador.crearGrupo(idMovimiento, grupo.id_zona.toString(), grupo.id_rama.toString(), grupo.id_grupo.toString(), grupo.nombre)
                    }catch(err){
                        console.log(err);
                    }
                }
                this.cargarMiembrosMovimiento(idMovimiento);
            })
    }

    cargarMiembrosMovimiento(idMovimiento){
        this.dao.getMiembroXMovimiento(idMovimiento)
            .then(res => {
                for(var i in res){
                    try{
                        var miembro =  res[i];
                        this.controlador.crearMiembro(miembro.cedula, miembro.nombre, miembro.celular, miembro.email, miembro.provincia, miembro.canton, miembro.distrito, miembro.senales, miembro.b_monitor, idMovimiento, miembro.id_zona.toString(), miembro.id_rama.toString(), miembro.id_grupo.toString());
                    }catch(err){
                        console.log(err);
                    }
                }
            })
    }
}    