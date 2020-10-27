const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');
import Controlador from './Controlador/Controlador';
import ControladorLogin from './Controlador/ControladorLogin'

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//quitar en producción
app.use(logger('dev'));

//The local port is 3001
const API_PORT = process.env.PORT || 3001
app.listen(API_PORT, function(){
    console.log("LISTENING ON PORT ",API_PORT);
})

var controlador = new Controlador();
var controladorLogin = new ControladorLogin(controlador);
//var creador = new Creador(controlador);
var idMovimiento = '4000042145';
//creador.iniciarAPI();


app.get('/', function(req, res){
    return res.json({success: true, message: "You just connected to the social seekers API, welcome :D"})
})

app.post('/iniciar-sesion', function(req, res){
    const { id, pass } = req.body;
    try{
        var loggedIn;
        var logInPromise = controladorLogin.verificarCombinación(id, pass)
            .then(res => {
                loggedIn = res;
            })
            .catch(err => {
                throw err
            })
        Promise.resolve(logInPromise)
            .finally(() => {
                if(loggedIn){
                    return res.json({ success: true});
                }
                return res.json({ success: false});
            })
        
    }catch(err){
        return res.json({ success: false, error: err });
    }
})

//////////////////////////////
///   CREATIONS
//////////////////////////////

app.get('/crear-miembro', function(req, res){
    const {idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor, idZona, idRama, idGrupo} = req.body;
    try{
        controlador.crearMiembro(idMiembro, nombre, celular, email, provincia, canton,distrito, idMovimiento, idZona, idRama, idGrupo);
        return res.json({success: true})
    }
    catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/crear-zona', function(req,res){
    const { idZona, nombre } = req.body
    try{
        controlador.crearZona(idMovimiento, idZona, nombre)
        return res.json({ success: true})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/crear-rama', function(req,res){
    const { idZona, idRama, nombre} = req.body
    try{
        controlador.crearRama(idMovimiento, idZona, idRama, nombre)
        return res.json({ success: true})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/crear-grupo', function(req,res){
    const { idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2} = req.body
    try{
        controlador.crearGrupo(idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2);
        return res.json({ success: true})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})


//////////////////////////////
///   MODIFY
//////////////////////////////

app.post('/modificar-miembro', function(req, res){
    const {idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor, idZona, idRama, idGrupo} = req.body;
    try{
        controlador.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idZona, idRama, idGrupo)
        return res.json({success: true})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})


//////////////////////////////
///   GETTERS
///   Returns a single value
//////////////////////////////


app.post('/get-zona', function(req, res){
    const { idZona } = req.body;
    console.log(idZona);        
    try{
        var zona = controlador.getZona(idMovimiento, idZona)
        return res.json({ success: true, zona, hijos: Object.fromEntries(zona.composites)})
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/get-rama', function(req,res){
    const { idZona, idRama } = req.body
    try{
        var rama = controlador.getRama(idMovimiento, idZona, idRama)
        return res.json({ success: true ,rama, hijos: Object.fromEntries(rama.composites)})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/get-grupo', function(req,res){
    const { idZona, idRama, idGrupo } = req.body
    try{
        var grupo = controlador.getGrupo(idMovimiento, idZona, idRama, idGrupo)
        return res.json({ success: true ,grupo, hijos: Object.fromEntries(grupo.composites)})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/get-miembro', function(req, res){
    const { idMiembro } = req.body;
    try{
        var miembro = controlador.getMiembro(idMovimiento, idMiembro);
        return res.json({success: true, miembro})
    }catch(err){
        console.log(err);
        return res.json({success: false, error:err})
    }
})

//////////////////////////////
///   CONSULTS
///   Returns an array of values
//////////////////////////////

app.get('/consultar-zonas',function(req,res){
    try{
        var zonas = controlador.consultarZonas(idMovimiento);
        return res.json({ success: true, zonas: Object.fromEntries(zonas)});
    }catch(err){
        return res.json({success: false, error: err});
    }
})

app.post('/consultar-ramas',function(req, res){
    const { idZona } = req.body;
    try{
        var ramas = controlador.consultarRamas(idMovimiento, idZona);
        return res.json({ success: true, ramas: Object.fromEntries(ramas)});
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err});
    }
})

app.post('/consultar-grupos',function(req, res){
    const { idZona, idRama} = req.body;
    try{
        var grupos = controlador.consultarGrupos(idMovimiento, idZona, idRama);
        return res.json({ success: true, grupos: Object.fromEntries(grupos)});
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err});
    }
})

app.post('/consultar-miembros-grupo', function(req, res){
    const { idZona, idRama, idGrupo} = req.body;
    //var idMiembro = "123";
    try{
        var miembros = controlador.consultarMiembrosGrupo(idMovimiento, idZona, idRama, idGrupo);   
        return res.json({success: true, miembros: Object.fromEntries(miembros)})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

/*
var idZona = "1";
var idRama = "1";
var idGrupo = "1";
controlador.crearZona(idZona, "Caribe");
controlador.crearRama(idZona, idRama, "Juvenil");
controlador.crearGrupo(idZona, idRama, idGrupo, "SCOUTS");
var idMiembro = "123";
var nombre = "Diego";
var celular = "12324";
var email = "email";
var provincia = "San José";
var canton = "Santa Ana";
var distrito = "brasil";
controlador.crearMiembro(idMiembro, nombre, celular, email, provincia, canton,distrito, "", "", idZona, idRama, idGrupo);

controlador.crearGrupo(idZona, idRama, "2", "here","123");*/