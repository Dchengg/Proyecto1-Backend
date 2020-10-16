const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());

//For local tests
//const API_PORT = 3001;
//app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

var server = app.listen(process.env.PORT || 8080, function(){
    var port = server.address.port();
    console.log("App now running on port",port);
})