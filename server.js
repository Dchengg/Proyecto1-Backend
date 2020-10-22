//var config = require('./config.json');
const express = require('express');
const app = express();
const pool = require("./db")
const {Client}=require("pg");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.get("/all",async(req, res) =>{
    try{
        await pool.connect();
        //const results = await pool.query("select * from Miembro")
        //console.table(results.rows)
        //res.send(results.rows);
        pool.end();
    }catch(err){
        console.log("Error:");
        console.error(err.message);
    }
});

app.listen(5432, () =>{
    console.log("server is listening on port 5432")
});