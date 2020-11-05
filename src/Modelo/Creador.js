import DAO from '../Controlador/DAO'
import Controlador from '../Controlador/Controlador'
import Movimiento from '../Controlador/Movimiento';

export default class Creador{
    constructor(controlador){
        this.dao = new DAO();
        this.controlador = controlador;
    }


    cargarMovimiento(cedulaAsesor){
        var cedula_juridica;
        cedula_juridica=this.dao.getMovimientoXAsesor(cedulaAsesor)
            .then(res => {
                var movimiento = res[0];
                try{
                    this.controlador.crearMovimiento(movimiento.cedula_juridica, cedulaAsesor, movimiento.nombre, movimiento.direccion_web, movimiento.logo, movimiento.pais, movimiento.provincia, movimiento.canton, movimiento.distrito, movimiento.senales);
                    this.cargarZonasMovimiento(movimiento.cedula_juridica);
                    cedula_juridica = movimiento.cedula_juridica;
                    this.dao.getAsesor(cedulaAsesor)
                        .then(res=> {
                            var miembro =  res[0];
                            console.log(cedula_juridica)
                            this.controlador.agregarMiembroAMovimiento(cedula_juridica,miembro.cedula, miembro.nombre, miembro.celular, miembro.email, miembro.provincia, miembro.canton, miembro.distrito, miembro.senales, miembro.b_monitor);
                        })
                }catch(err){
                    console.log(err);
                }
                return movimiento.cedula_juridica;
            });
            return cedula_juridica;
    } 

    cargarZonasMovimiento(idMovimiento){
        console.log(idMovimiento)
        this.dao.getZonaXMovimiento(idMovimiento)
            .then(res => {
                for(var i in res){
                    var zona = res[i]
                    try{
                        this.controlador.agregarZona(idMovimiento, zona.id_zona.toString(), zona.nombre);
                        
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
                        this.controlador.agregarRama(idMovimiento, rama.id_zona.toString(), rama.id_rama.toString(), rama.nombre);
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
                        try{
                            this.controlador.agregarGrupo(idMovimiento, grupo.id_zona.toString(), grupo.id_rama.toString(), grupo.id_grupo.toString(), grupo.nombre);
                            var grupoCreado = this.controlador.getGrupo(idMovimiento, grupo.id_zona.toString(), grupo.id_rama.toString(), grupo.id_grupo.toString());
                            grupoCreado.encargado1 = grupo.id_miembro;
                            grupoCreado.isJefe = grupo.b_monitor;
                        }catch(err){
                            var grupoCreado = this.controlador.getGrupo(idMovimiento, grupo.id_zona.toString(), grupo.id_rama.toString(), grupo.id_grupo.toString());
                            grupoCreado.encargado2 = grupo.id_miembro;
                        }
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
                        this.controlador.agregarMiembro(miembro.cedula, miembro.nombre, miembro.celular, miembro.email, miembro.provincia, miembro.canton, miembro.distrito, miembro.senales, miembro.b_monitor, idMovimiento, miembro.id_zona.toString(), miembro.id_rama.toString(), miembro.id_grupo.toString());
                    }catch(err){
                        console.log(err);
                    }
                }
            })
    }

}    