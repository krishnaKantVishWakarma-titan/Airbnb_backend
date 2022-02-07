const express = require("express")
const app = express()
// const userRoute = require("./routes/paths.js")
const airbnbController = require("./controller");
const morgan = require("morgan")
require('dotenv').config();
var cors = require('cors')
// const mongoose = require('mongoose')

// mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
// .then(() => console.log("Connected to mongoose ..."))
// .catch(err => {
// 	console.log(`db error ${err.message}`)
// 	process.exit(-1)
// });

// mysql connection
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});
conn.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log(err)
    }
})
// var pool1      =    mysql.createPool({
//     connectionLimit : 1000,
//     host     : process.env.DB_HOST,
//     user     : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.DB_NAME,
//     debug    :  false
// });

app.use(morgan("dev"))
app.use(cors({origin: '*'}))
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use('/', userRoute)
app.use('/', airbnbController);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server listing at port: ${PORT} ...`)) // port
