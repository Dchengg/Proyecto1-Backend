import DAO from '../Controlador/DAO'
import Controlador from '../Controlador/Controlador'
import Movimiento from '../Controlador/Movimiento';

export default class Creador{
    constructor(controlador){
        this.dao = new DAO();
        this.controlador = controlador;
    }


    cargarMovimiento(cedula_juridica){
        this.dao.getMovimiento(cedula_juridica)
            .then(res => {
                var movimiento = res[0];
                try{
                    this.dao.getTelefonoMovimiento(movimiento.cedula_juridica)
                    .then(telefono => {
                        this.controlador.agregarMovimiento(movimiento.cedula_juridica, movimiento.id_asesor, movimiento.nombre, movimiento.direccion_web, movimiento.logo, movimiento.pais, movimiento.provincia, movimiento.canton, movimiento.distrito, movimiento.senales, telefono);
                        /*var mov = this.controlador.getMovimiento(movimiento.cedula_juridica);
                        for(var i in telefono){
                            mov.telefonos.push(telefono[i].celular);
                        }*/
                    })
                    this.cargarZonasMovimiento(movimiento.cedula_juridica);
                    this.dao.getAsesor(movimiento.id_asesor)
                        .then(res=> {
                            var miembro =  res[0];
                            this.controlador.agregarMiembroAMovimiento(cedula_juridica,miembro.cedula, miembro.nombre, miembro.celular, miembro.email, miembro.provincia, miembro.canton, miembro.distrito, miembro.senales, miembro.b_monitor);
                            this.dao.getNoticiasXAsesor(miembro.cedula)
                            .then(resNoticias => {
                                var asesor = this.controlador.getMiembro(cedula_juridica, miembro.cedula)
                                for(var i in resNoticias){
                                    asesor.noticias.push(resNoticias[i].id_noticia)
                                }
                            })
                            .catch(err => {
                                console.log("_________________________________________")
                                console.log(err)
                                console.log("_________________________________________")
                            })
                        })
                }catch(err){
                    console.log(err);
                }
                return movimiento.cedula_juridica;
            });
            return cedula_juridica;
    } 

    cargarZonasMovimiento(idMovimiento){
        this.dao.getZonaXMovimiento(idMovimiento)
            .then(res => {
                for(var i in res){
                    var zona = res[i]
                    try{
                        this.controlador.agregarZona(idMovimiento, zona.id_zona.toString(), zona.nombre, zona.jefe1, zona.jefe2);

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
                        this.controlador.agregarRama(idMovimiento, rama.id_zona.toString(), rama.id_rama.toString(), rama.nombre, rama.jefe1, rama.jefe2);
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
                        this.controlador.agregarGrupo(idMovimiento, grupo.id_zona.toString(), grupo.id_rama.toString(), grupo.id_grupo.toString(), grupo.nombre, grupo.b_monitor, grupo.jefe1, grupo.jefe2);             
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
                this.cargarNoticiasMiembros(idMovimiento);
            })
    }

    cargarNoticiasMiembros(idMovimiento){
        var movimiento = this.controlador.getMovimiento(idMovimiento);
        var miembros = movimiento.gMiembros.miembros;
        var self = this;
        miembros.forEach(function(value, key){
            self.dao.noticiaRecibidasMiembro(idMovimiento, key)
            .then( res => {
                for(var i in res){
                    var id = res[i].id_noticia;
                    value.noticias.push(id);
                }
            })
        })
    }

}    