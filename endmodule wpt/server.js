const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "test",
    port: 3307
})

connection.connect();

app.use(bodyparser.urlencoded({extended:false}));

var staticFolder = express.static(path.join(__dirname, "public"));
app.use(staticFolder);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/ajay", function(req, res) {

    var name = req.body.name;
    var age = req.body.age;
    var re;

    var q = "insert into tester values ('"+name+"',"+age+")";

    connection.query(q, function(err, result) {
        if(err)
        console.log(err);
        else
        console.log(result);
        re = result;
    })
    res.sendFile(path.join(__dirname, "public/second.html"));
});

app.get("/sidd", function(req, res) {
    res.sendFile(path.join(__dirname, "third.html"));
});

app.listen(8080);
console.log("port : 8080");