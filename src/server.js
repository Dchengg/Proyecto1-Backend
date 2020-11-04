const express = require('express');
const session = require('express-session')
const cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');
import Controlador from './Controlador/Controlador';
import ControladorLogin from './Controlador/ControladorLogin';
import DAO from "./Controlador/DAO";

var app = express();
app.use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//quitar en producción
app.use(logger('dev'));

app.use(session({
  secret: 'secret word',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))

//The local port is 3001
const API_PORT = process.env.PORT || 3001
app.listen(API_PORT, function(){
    console.log("LISTENING ON PORT ",API_PORT);
})

var controlador = new Controlador();
var controladorLogin = new ControladorLogin(controlador);
var dao = new DAO();
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
                console.log(res);
                loggedIn = res.encontrado;
                req.session.idMovimiento = res.idMovimiento
            })
            .catch(err => {
                throw err
            })
        Promise.resolve(logInPromise)
            .finally(() => {
                if(loggedIn){
                    req.session.idAsesor = id;
                    console.log(req.session.idAsesor + "||||||||||||||||||||||||||||||");
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
        controlador.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor,'4000042145' ,  idZona, idRama, idGrupo)
        return res.json({success: true})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/modificar-movimiento', function(req,res){
    const {idMovimiento, idAsesor, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas} = req.body;
    try{
        controlador.modificarMovimiento(idMovimiento, idAsesor, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas);
        return res.json({ success: true })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})


//////////////////////////////
///   GETTERS
///   Returns a single value
//////////////////////////////

app.post('/get-movimiento', function(req, res){
    const { idMovimiento } = req.body;
    try{
        var movimiento = controlador.getMovimiento(idMovimiento);
        return res.json({ success: true,  movimiento: movimiento })
    }catch(err){
        console.log(err);
        return res.json({ success: true, error: err })
    }
})

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
        var grupos;
        var gruposPromise = controlador.getGruposMiembro(idMovimiento, idMiembro)
            .then(res => {
                grupos = res;
            })
        Promise.resolve(gruposPromise)
            .finally(() => {
                return res.json({ success: true, miembro, grupos})
            })
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

app.post('/consultar-ramas-disponibles',function(req, res){
    const { idMiembro } = req.body;
    try{
        var ramas;
        var ramasPromise = controlador.consultarRamasDisponibles(idMovimiento, idMiembro)
            .then(res => {
                ramas = res
            })
            .catch(err => {
                throw err
            })
        Promise.resolve(ramasPromise)
            .finally(() => {
                return res.json({success: true, ramas :Object.fromEntries(ramas)})
            })
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


//////////////////////////////
///   EXTRA
//////////////////////////////

app.post('/agregar-miembro-grupo', function(req, res){
    const {idZona, idRama, idGrupo, idMiembro} = req.body;
    try{
        controlador.agregarMiembroGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro);
        return res.json({success: true});
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/asignar-jefe-grupo', function(req, res){
    const {idZona, idRama, idGrupo, idMiembro, idMiembro2} = req.body;
    try{
        controlador.asignarJefeGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro ,idMiembro2)
        return res.json({success: true});
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/asignar-jefe-rama', function(req, res){
    const {idZona, idRama, idMiembro, idMiembro2} = req.body;
    try{
        controlador.asignarJefeRama(idMovimiento, idZona, idRama, idMiembro, idMiembro2, idMiembro2)
        return res.json({success: true});
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/asignar-jefe-zona', function(req, res){
    const {idZona, idRama, idMiembro, idMiembro2} = req.body;
    try{
        controlador.asignarJefeRama(idMovimiento, idZona, idRama, idMiembro,idMiembro2, idMiembro2)
        return res.json({success: true});
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})


app.get('/showSession', (req, res) =>{
    res.send(req.session);
    res.end();
    //return res.json({success: true, session: session.userName})
});

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
