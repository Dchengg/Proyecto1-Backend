const express = require('express');
const session = require('express-session')
const cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');
import Controlador from './Controlador/Controlador';
import ControladorLogin from './Controlador/ControladorLogin';



var app = express();
app.use(cors({origin: [
    "http://localhost:4200","https://social-seekers-bbb14.web.app"
  ], credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//quitar en producción
app.use(logger('dev'));

//app.set('trust proxy', 1);

app.use(session({
  secret: 'secret word',
  resave: false,
  saveUninitialized: true,
  cookie: {   
      httpOnly: false,
      secure: false, 
      sameSite: 'none'
    }
}))

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
                    return res.json({ success: true});
                }
                return res.json({ success: false});
            })
        
    }catch(err){
        return res.json({ success: false, error: err });
    }
})

//////////////////////////////
///   CREAR
//////////////////////////////

app.post('/crear-miembro', function(req, res){
    const {idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor, idZona, idRama, idGrupo} = req.body;
    try{
        controlador.crearMiembroNuevo(idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo)
        .then(() => {
            return res.json({success: true});
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }
    catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/crear-movimiento', function(req, res){
    const {cedulaJuridica,nombreMovimiento, direccionWeb, logo, pais, provinciaMovimiento, cantonMovimiento, distritoMovimiento
        , telefonos, senasMovimiento,idAsesor, nombre, contrasena, celular, email, provincia, canton,distrito, senas } = req.body;
    try{
        controlador.crearAsesor(idAsesor, contrasena, nombre, email, celular, provincia, distrito, canton, senas)
        .then( () => {
            controlador.crearMovimiento(cedulaJuridica, idAsesor, nombreMovimiento, direccionWeb, logo, pais, provinciaMovimiento, cantonMovimiento, distritoMovimiento, senasMovimiento, telefonos)
            .then( () => {
                return res.json({success: true});
            })
            .catch( err => {
                controlador.eliminarAsesor(idAsesor);
                return res.json({success: false, error: {message: err.message}});
            })
        })
        .catch( err => {
            return res.json({success: false, error:{ message: err.message}})
        })
    }catch(err){
        return res.json({success: false, error: err})
    }
})

app.post('/crear-zona', function(req,res){
    const { nombre } = req.body
    try{
        controlador.crearZonaNueva(idMovimiento, nombre)
        .then( () => {
            return res.json({ success: true})
        })
        .catch(err => {
            return res.json({success: false, error: {message:err.message}})
        })
    }catch(err){
        return res.json({success: false, error: err})
    }
})

app.post('/crear-rama', function(req,res){
    const { idZona,nombre} = req.body
    try{
        controlador.crearRamaNueva(idMovimiento, idZona, nombre)
        .then( () => {
            return res.json({success: true})
        })
        .catch(err => {
            return res.json({success: false, error: {message:err.message} })
        })
    }catch(err){
        return res.json({success: false, error: err})
    }
})

app.post('/crear-grupo', function(req,res){
    const { idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isMonitor} = req.body
    try{
        controlador.crearGrupoNuevo(idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isMonitor)
        .then( () => {
            return res.json({ success: true})
        })
        .catch(err => {
            return res.json({success: false, error:{message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})


//////////////////////////////
///   MODIFY
//////////////////////////////

app.post('/modificar-asesor', function(req, res){
    const {idAsesor, nombre, contrasena, celular, email, provincia, canton,distrito, senas} = req.body;
    try{
        controlador.modificarAsesor(idMovimiento, idAsesor, contrasena, nombre, email, celular, provincia, distrito, canton, senas)
        .then( () => {
            return res.json({success: true})
        })
        .catch( err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err) {
        return res.json({success: false, error: err})
    }
})

app.post('/modificar-miembro', function(req, res){
    const {idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor} = req.body;
    try{
        controlador.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento)
        return res.json({success: true})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/modificar-movimiento', function(req,res){
    const  { nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas, telefonos} = req.body;
    try{
        controlador.modificarMovimiento(idMovimiento, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas, telefonos)
        .then( () => {
            return res.json({ success: true })
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message  }})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: {message: err}})
    }
})

app.post('/modificar-zona', function(req,res){
    const { idZona, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2} = req.body;
    try{
        var promise = controlador.modificarZona(idMovimiento, idZona, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2);
        Promise.resolve(promise)
            .finally(() => {
                return res.json({ success: true })
            })
            .catch(err => {
                throw err
            })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/modificar-rama', function(req, res){
    const { idZona, idRama, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2 } = req.body;
    try{
        controlador.modificarRama(idMovimiento, idZona, idRama, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2)
        .then( () => {
            return res.json({ success: true})
        })
        .catch(err => {
            return res.json({success: false, error: {message:err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/modificar-grupo', function(req, res){
    const { idZona, idRama, idGrupo, nombre, isMonitor,  idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2 } = req.body;
    try{
        controlador.modificarGrupo(idMovimiento, idZona, idRama, idGrupo, nombre, isMonitor, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2)
        .then( () => {
            return res.json({ success: true})
        })
        .catch(err => {
            return res.json({success: false, error: {message:err.message}})
        })
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
    //const { idMovimiento } = req.body;
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
        return res.json({ success: true, zona, ramas: Object.fromEntries(zona.composites)})
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/get-rama', function(req,res){
    const { idZona, idRama } = req.body
    try{
        var rama = controlador.getRama(idMovimiento, idZona, idRama)
        return res.json({ success: true ,rama, grupos: Object.fromEntries(rama.composites)})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/get-grupo', function(req,res){
    const { idZona, idRama, idGrupo } = req.body
    try{
        var grupo = controlador.getGrupo(idMovimiento, idZona, idRama, idGrupo)
        return res.json({ success: true ,grupo, miembros: Object.fromEntries(grupo.composites)})
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
        controlador.consultarRamasDisponibles(idMovimiento, idMiembro)
        .then( ramas => {
            return res.json({success: true, ramas})
        })
        .catch(err => {
            return res.json({success: false, error: {message:err.mesasage}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err});
    }
})  

app.post('/consultar-ramas-miembro', function(req, res){
    const { idMiembro } = req.body;
    try{
        controlador.consultarRamasMiembro(idMovimiento, idMiembro)
        .then( ramas => {
            return res.json({success:true, ramas})
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success:false, error: err})
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

app.post('/consultar-grupo-miembro-en-rama', function(req, res){
    const { idZona, idRama, idMiembro} = req.body;
    try{
        controlador.consultarGrupoDeMiembroEnRama(idMovimiento, idZona, idRama, idMiembro)
        .then( grupo => {
            return res.json({success: true, grupo})
        })
        .catch( err => {
            return res.json({success:false, error: {mesasage: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-miembros-grupo', function(req, res){
    const { idZona, idRama, idGrupo} = req.body;
    try{
        var miembros = controlador.consultarMiembrosGrupo(idMovimiento, idZona, idRama, idGrupo);   
        return res.json({success: true, miembros: Object.fromEntries(miembros)})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-miembros-rama', function(req, res){
    const { idZona, idRama } = req.body;
    try{
        var miembros = controlador.consultarMiembrosRama(idMovimiento, idZona, idRama);
        return res.json({success: true, miembros})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-miembros-zona', function(req, res){
    const { idZona } = req.body;
    try{
        var miembros = controlador.consultarMiembrosZona(idMovimiento, idZona);
        return res.json({success: true, miembros})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-monitores-probables', function(req, res) {
    const {idZona, idRama, idGrupo } = req.body;
    try{
        controlador.consultarMonitoresProbables(idMovimiento, idZona, idRama, idGrupo)
        .then(monitores => {
            return res.json( {success: true, monitores})
        })
        .catch(err => {
            return res.json( { success: false, error: {message:err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json( { success: false, error: err})
    }
})

app.post('/consultar-monitores-zona', function(req, res) {
    const { idZona } = req.body;
    try{
        controlador.consultarMonitoresZona(idMovimiento, idZona)
        .then(monitores => {
            return res.jsonp({success: true, monitores})
        })
        .catch(err => {
            return res.json({ success: false, error:{message:err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})




//////////////////////////////
///   EXTRA
//////////////////////////////

app.post('/agregar-miembro-grupo', function(req, res){
    const {idZona, idRama, idGrupo, idMiembro} = req.body;
    try{
        controlador.agregarMiembroNuevoAGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro)
        .then( () => {
            res.json({success: true})
        })
        .catch( err => {
            res.json({success: false, error:{message:err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/cambio-de-grupo', function(req, res){
    const{ idZona, idRama, idGrupoViejo, idGrupoNuevo, idMiembro } = req.body;
    try{
        /*controlador.agregarMiembroNuevoAGrupo(idMovimiento, idZona, idRama, idGrupoNuevo, idMiembro)
        .then( () => {
            controlador.eliminarMiembroGrupo(idMovimiento, idZona, idRama, idGrupoViejo, idMiembro)
            .then( () => {
                return res.json({ success: true});
            })
            .catch(err => {
                controlador.eliminarMiembroGrupo(idMovimiento, idZona, idRama, idGrupoNuevo, idMiembro);
                throw err
            })
        })
        .catch( err => {
            return res.json({success: false, error: {message: err.message}})
        })*/
        controlador.cambioDeGrupo(idMovimiento, idZona, idRama, idGrupoNuevo, idGrupoViejo, idMiembro)
        .then( () => {
            return res.json({success: true})
        })
        .catch( err => {
            return res.json({success: false, error: { message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({ success: false, error:err.mesasage})
    }
})

app.post('/asignar-encargado-grupo', function(req, res){
    const {idZona, idRama, idGrupo, idMiembro, idMiembro2, isMonitor} = req.body;
    try{
        controlador.asignarEncargadoGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro ,idMiembro2, isMonitor)
        return res.json({success: true});
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/asignar-encargado-rama', function(req, res){
    const {idZona, idRama, idMiembro, idMiembro2, isMonitor} = req.body;
    try{
        controlador.asignarEncargadoRama(idMovimiento, idZona, idRama, idMiembro, idMiembro2, idMiembro2, isMonitor)
        return res.json({success: true});
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/asignar-encargado-zona', function(req, res){
    const {idZona, idMiembro, idMiembro2, isMonitor} = req.body;
    try{
        controlador.asignarEncargadoZona(idMovimiento, idZona, idMiembro,idMiembro2, idMiembro2, isMonitor)
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
