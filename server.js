const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');
import Controlador from './Controlador/Controlador';

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//The local port is 3001
const API_PORT = process.env.PORT || 3001
app.listen(API_PORT, function(){
    console.log("LISTENING ON PORT ",API_PORT);
})

var controlador = new Controlador();

app.get('/', function(req, res){
    return res.json({success: true, message: "You just connected to the social seekers API, welcome :D"})
})

app.get('/crear-miembro', function(req, res){
    //const {idMiembro, nombre, celular, email, provincia, canton,distrito, senas, posible_monitor, idZona, idRama, idGrupo} = req.body;
    var idMiembro = "123";
    var nombre = "Diego";
    var celular = "12324";
    var email = "email";
    var provincia = "San José";
    var canton = "Santa Ana";
    var distrito = "brasil";
    try{
        controlador.crearMiembro(idMiembro, nombre, celular, email, provincia, canton,distrito);
        return res.json({success: true})
    }
    catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/crear-zona', function(req,res){
    const { nombre } = req.body
    try{
        
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})

app.post('/consultar-miembro', function(req, res){
    const { idMiembro } = req.body;
    //var idMiembro = "123";
    try{
        var miembro = controlador.consultarMiembro(idMiembro)
        return res.json({success: true, miembro: miembro})
    }catch(err){
        console.log(err);
        return res.json({success: false, error: err})
    }
})
