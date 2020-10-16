const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());

//The local port is 3001
const API_PORT = process.env.PORT || 3001
app.listen(API_PORT, function(){
    console.log("LISTENING ON PORT ",API_PORT);
})

app.get('/', function(req, res){
    return res.json({success: true, message: "You just connected to the social seekers API, welcome :D"})
})