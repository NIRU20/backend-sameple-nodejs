const express = require('express');
const app = express();
// const authRoutes = require("./src/config/auth");//for routing
const cookieParser = require("cookie-parser");
const session = require('express-session');
const bodyParser=require("body-parser")
var cors = require('cors');

const jwt = require('jsonwebtoken')
'use strict'

require('dotenv').config();
const connect_db = require('./src/config/mongo_connection');
const routes=require("./src/config/routers")
const winston=require('winston')

// app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(cors({
//     origin:["http://localhost:3000"],
//     methods:["GET","POST"],
//     credentials:true
// }));

const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
//session middleware
app.use(session({
    cookie:{
        expires:oneDay
    },
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    resave: false,
    saveUninitialized: false,
    // saveUninitialized:true,
}));

connect_db()


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers['origin']);
    res.header("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Allow-Methods", req.headers['access-control-request-method']);
    next();
});

routes(app)

const port =process.env.PORT || 4001;

app.listen(port,()=>{
    winston.info("App is running on "+port);
})
