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

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb'}));
//quitar en producción
app.use(logger('dev'));

app.use(session({
  secret: 'secret word',
  name: 'socialseekers',
  resave: false,
  saveUninitialized: false,
  cookie: {   
      httpOnly: false,
      secure: true, 
      sameSite: "none"
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
//creador.iniciarAPI();


app.get('/', function(req, res){
    return res.json({success: true, message: "You just connected to the social seekers API, welcome :D"})
})

app.post('/iniciar-sesion', function(req, res){
    const { id, pass, idMovimiento} = req.body;
    try{
        controladorLogin.verificarCombinación(id, pass, idMovimiento)
            .then(userType => {
                return res.json({success: true, movimiento: idMovimiento, user: userType})
            })
            .catch(err => {
                return res.json({ success: false, error: err.message})
            })
       /* var logInPromise = controladorLogin.verificarCombinación(id, pass, idMovimiento)
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
                    return res.json({ success: true, movimiento: idMovimiento});
                }
            })
            .catch(err => {
                throw err
            })*/
        
    }catch(err){
        console.log(err)
        return res.json({ success: false, error: err });
    }
})

//////////////////////////////
///   CREAR
//////////////////////////////

app.post('/crear-miembro', function(req, res){
    const {idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor, idMovimiento, idZona, idRama, idGrupo} = req.body;
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
    const {idMovimiento, nombre } = req.body
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
    const { idMovimiento, idZona,nombre} = req.body
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
    const { idMovimiento, idZona, idRama, idGrupo, nombre, idEncargado1, idEncargado2, isMonitor} = req.body
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

app.post('/crear-noticia', function(req, res){
    //tipo = MOVIMIENTO | ZONA | RAMA | GRUPO 
    const {idMovimiento, idZona, idRama, idGrupo, idEmisor, titulo, contenido, imagenes, tipo} = req.body;
    try{
        controlador.crearNoticia(idEmisor, titulo, contenido, imagenes, idMovimiento, idZona, idRama, idGrupo, tipo)
        .then( (idNoticia) => {
            console.log(idNoticia)
            return res.json({success: true})
        })
        .catch(err => {
            return res.json({success: false, error:{ message: err.message }})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/leer-noticia', function(req, res){
    const { idNoticia, idMiembro } = req.body;
    try{
        controlador.leerNoticia(idNoticia, idMiembro)
        .then( () => {
            return res.json({success: true})
        })
        .catch(err => {
            return res.json({success: false, error:{ message: err.message }})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/crear-aporte', function(req, res){
    const { tipo, contenido, idEmisor, idMovimiento} = req.body;
    try{
        controlador.publicarAporte(tipo,contenido,idEmisor,idMovimiento)
        .then( (idNoticia) => {
            console.log(idNoticia)
            return res.json({success: true})
        })
        .catch(err => {
            return res.json({success: false, error:{ message: err.message }})
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
    const {idMovimiento, idAsesor, nombre, contrasena, celular, email, provincia, canton,distrito, senas} = req.body;
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
    const {idMovimiento, idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor} = req.body;
    try{
        controlador.modificarMiembro(idMiembro, nombre, celular, email, provincia, canton, distrito, senas, posible_monitor, idMovimiento)
        .then( () => {
            return res.json({success: true})
        })
        .catch( err => {
            return res.json({success: false, error: { message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/modificar-movimiento', function(req,res){
    const  { idMovimiento, nombre, direccionWeb, logo, pais, provincia, canton, distrito, senas, telefonos} = req.body;
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
    const { idMovimiento, idZona, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2} = req.body;
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
    const { idMovimiento, idZona, idRama, nombre, idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2 } = req.body;
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
    const { idMovimiento, idZona, idRama, idGrupo, nombre, isMonitor,  idJefeNuevo1, idJefeNuevo2, idJefeViejo1, idJefeViejo2 } = req.body;
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


app.post('/modificar-contrasena', function(req, res){
    const {idMiembro, contrasena } = req.body;
    try{
        controlador.modificarContrasena(idMiembro, contrasena)
        .then( () => {
            return res.json({success: true})
        })
        .catch(err => {
            return res.json({success: false, error:{message: err.message}})
        }) 
    }catch(err){
        return res.json({success: false, error: err})
    }
})

//////////////////////////////
///   GETTERS
///   Returns a single value
//////////////////////////////

app.get('/get-movimientos', function(req, res){
    try{
        var movimientos
        var movimientosPromise = controlador.getMovimientos()
        .then(res => {
            movimientos = res;
        })
        Promise.resolve(movimientosPromise)
            .finally( () => {
                return res.json({success: true, movimientos: movimientos})
            }) 
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/get-movimientos-miembro', function(req, res){
    const { idMiembro } = req.body;
    try{
        var movimientos
        var movimientosPromise = controlador.getMovimientosMiembro(idMiembro)
        .then(res => {
            movimientos = res;
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
        Promise.resolve(movimientosPromise)
            .finally( () => {
                return res.json({success: true, movimientos: movimientos})
            }) 
    }catch(err){
        return res.json({success: false, error: err})
    }
})

app.post('/get-movimiento', function(req, res){
    const { idMovimiento } = req.body;
    try{
        var movimiento = controlador.getMovimiento(idMovimiento);
        return res.json({ success: true,  movimiento: movimiento })
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err })
    }
})

app.post('/get-zona', function(req, res){
    const { idMovimiento, idZona } = req.body;
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
    const { idMovimiento, idZona, idRama } = req.body
    try{
        var rama = controlador.getRama(idMovimiento, idZona, idRama)
        return res.json({ success: true ,rama, grupos: Object.fromEntries(rama.composites)})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/get-grupo', function(req,res){
    const { idMovimiento, idZona, idRama, idGrupo } = req.body
    try{
        var grupo = controlador.getGrupo(idMovimiento, idZona, idRama, idGrupo)
        return res.json({ success: true ,grupo, miembros: Object.fromEntries(grupo.composites)})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/get-miembro', function(req, res){
    const { idMovimiento, idMiembro } = req.body;
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

app.post('/get-imagenes-noticia', function(req, res){
    const { idNoticia } = req.body;
    try{
        controlador.getImagenesNoticia(idNoticia)
        .then( imagenes => {
            return res.json({success: true, imagenes})
        })
        .catch( err => {
            return res.json({success: false, error: { message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error:err})
    }
})

app.post('/get-reporte', function(req,res){
    const { idMovimiento } = req.body
    try{
        var reporte = controlador.getReporte("General",idMovimiento)
        return res.json({ success: true ,reporte})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/get-reporte', function(req,res){
    const {idMovimiento} = req.body
    try{
        var reporte = controlador.getReporte("Tipado",idMovimiento)
        return res.json({ success: true ,reporte})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})
//////////////////////////////
///   CONSULTS
///   Returns an array of values
//////////////////////////////

app.post('/consultar-zonas',function(req,res){
    const { idMovimiento } = req.body
    try{
        var zonas = controlador.consultarZonas(idMovimiento);
        return res.json({ success: true, zonas: Object.fromEntries(zonas)});
    }catch(err){
        return res.json({success: false, error: err});
    }
})

app.post('/consultar-ramas',function(req, res){
    const { idMovimiento, idZona } = req.body;
    try{
        var ramas = controlador.consultarRamas(idMovimiento, idZona);
        return res.json({ success: true, ramas: Object.fromEntries(ramas)});
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err});
    }
})

app.post('/consultar-ramas-disponibles',function(req, res){
    const { idMovimiento, idMiembro } = req.body;
    try{
        controlador.consultarRamasDisponibles(idMovimiento, idMiembro)
        .then( ramas => {
            return res.json({success: true, ramas})
        })
        .catch(err => {
            return res.json({success: false, error: {message:err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err});
    }
})  

app.post('/consultar-ramas-miembro', function(req, res){
    const { idMovimiento, idMiembro } = req.body;
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


app.post('/consultar-zonas-lider', function(req, res){
    const { idMovimiento, idMiembro} = req.body;
    try{
        controlador.consultarZonasLider(idMovimiento, idMiembro)
        .then( zonas => {
            return res.json({success: true, zonas})
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-ramas-lider', function(req, res){
    const { idMovimiento, idZona, idMiembro} = req.body;
    try{
        controlador.consultarRamasLider(idMovimiento, idZona, idMiembro)
        .then( ramas => {
            return res.json({success: true, ramas})
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-grupos-lider', function(req, res){
    const { idMovimiento, idZona, idRama, idMiembro} = req.body;
    try{
        controlador.consultarGruposLider(idMovimiento, idZona, idRama, idMiembro)
        .then( grupos => {
            return res.json({success: true, grupos})
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-zonas-miembro', function(req, res){
    const { idMovimiento, idMiembro } = req.body;
    try{
        controlador.consultarZonasMiembro(idMovimiento, idMiembro)
        .then( zonas => {
            return res.json({success: true, zonas})
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-grupos-miembro-alterno', function(req, res){
    const { idMovimiento, idZona, idRama, idMiembro } = req.body;
    try{
        controlador.consultarGruposMiembro(idMovimiento, idZona, idRama, idMiembro)
        .then( grupos => {
            return res.json({success: true, grupos})
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-todas-las-ramas-miembro', function(req, res){
    const { idMovimiento, idZona, idMiembro} = req.body;
    try{
        controlador.consultarTodasLasRamasMiembro(idMovimiento, idZona, idMiembro)
        .then( ramas => {
            return res.json({success: true, ramas})
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-todos-los-grupos-miembro', function(req, res){
    const { idMovimiento, idMiembro} = req.body;
    try{
        controlador.consultarTodosLosGruposMiembro(idMovimiento, idMiembro)
        .then( grupos=> {
            return res.json({success: true, grupos})
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})


app.post('/consultar-grupos-miembro', function(req, res){
    const { idMovimiento, idMiembro} = req.body;
    try{
        controlador.getGruposMiembro(idMovimiento, idMiembro)
        .then( grupos => {
            return res.json({success: true, grupos})
        })
        .catch(err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-grupos',function(req, res){
    const { idMovimiento, idZona, idRama} = req.body;
    try{
        var grupos = controlador.consultarGrupos(idMovimiento, idZona, idRama);
        return res.json({ success: true, grupos: Object.fromEntries(grupos)});
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err});
    }
})

app.post('/consultar-grupo-miembro-en-rama', function(req, res){
    const { idMovimiento, idZona, idRama, idMiembro} = req.body;
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
    const { idMovimiento, idZona, idRama, idGrupo} = req.body;
    try{
        var miembros = controlador.consultarMiembrosGrupo(idMovimiento, idZona, idRama, idGrupo);   
        return res.json({success: true, miembros: Object.fromEntries(miembros)})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-miembros-rama', function(req, res){
    const { idMovimiento, idZona, idRama } = req.body;
    try{
        var miembros = controlador.consultarMiembrosRama(idMovimiento, idZona, idRama);
        return res.json({success: true, miembros})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-miembros-zona', function(req, res){
    const { idMovimiento, idZona } = req.body;
    try{
        var miembros = controlador.consultarMiembrosZona(idMovimiento, idZona);
        return res.json({success: true, miembros})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-monitores-probables', function(req, res) {
    const { idMovimiento, idZona, idRama, idGrupo } = req.body;
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
    const { idMovimiento, idZona } = req.body;
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


app.post('/consultar-noticias-miembro', function(req, res){
    const { idMovimiento, idMiembro } = req.body;
    try{
        controlador.obtenerNoticias(idMovimiento, idMiembro)
        .then( noticias => {
            return res.json({ success: true, noticias})
        })
        .catch( err => {
            return res.json({ success: false,error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-noticias-asesor', function(req, res){
    const { idMovimiento, idMiembro } = req.body;
    try{
        controlador.obtenerNoticiasAsesor(idMovimiento, idMiembro)
        .then( noticias => {
            return res.json({ success: true, noticias})
        })
        .catch( err => {
            return res.json({ success: false,error: {message: err.message}})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})



app.post('/consultar-imagenes-noticia', function(req, res){
    const { idNoticia } = req.body;
    try{
        controlador.getImagenesNoticia(idNoticia)
        .then( imagenes => {
            return res.json({ success: true, imagenes})
        })
        .catch( err => {
            return res.json({ success: false})
        })
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})


//////////////////////////////
///   EXTRA
//////////////////////////////

app.post('/agregar-miembro-grupo', function(req, res){
    const { idMovimiento, idZona, idRama, idGrupo, idMiembro} = req.body;
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
    const{ idMovimiento, idZona, idRama, idGrupoViejo, idGrupoNuevo, idMiembro } = req.body;
    try{
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
    const { idMovimiento, idZona, idRama, idGrupo, idMiembro, idMiembro2, isMonitor} = req.body;
    try{
        controlador.asignarEncargadoGrupo(idMovimiento, idZona, idRama, idGrupo, idMiembro ,idMiembro2, isMonitor)
        return res.json({success: true});
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/asignar-encargado-rama', function(req, res){
    const { idMovimiento, idZona, idRama, idMiembro, idMiembro2, isMonitor} = req.body;
    try{
        controlador.asignarEncargadoRama(idMovimiento, idZona, idRama, idMiembro, idMiembro2, idMiembro2, isMonitor)
        return res.json({success: true});
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})

app.post('/asignar-encargado-zona', function(req, res){
    const { idMovimiento, idZona, idMiembro, idMiembro2, isMonitor} = req.body;
    try{
        controlador.asignarEncargadoZona(idMovimiento, idZona, idMiembro,idMiembro2, idMiembro2, isMonitor)
        return res.json({success: true});
    }catch(err){
        console.log(err);
        return res.json({ success: false, error: err})
    }
})


app.post('/iniciar-estructura-movimiento', function(req, res){
    const { idMovimiento, nombreZona, nombreRama, idGrupo, nombreGrupo, idMiembro, idMiembro2,
         nombreMiembro, celular, email, provincia, canton,distrito, senas, posible_monitor } = req.body;
    try{
        controlador.crearEstructuraBase(idMovimiento, nombreZona, nombreRama, idGrupo, nombreGrupo, idMiembro, idMiembro2,
            nombreMiembro, celular, email, provincia, canton,distrito, senas, posible_monitor)
        .then( () => {
            return res.json({success: true})
        })
        .catch( err => {
            return res.json({success: false, error: {message: err.message}})
        })
    }catch(err){
        return res.json({ success: false, error: err})
    }
})

