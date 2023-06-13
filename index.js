const express = require("express")
const app = express()
const userRoute = require("./routes/paths.js")
const morgan = require("morgan")
require('dotenv').config();
var cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
.then(() => console.log("Connected to mongoose ..."))
.catch(err => {
	console.log(`db error ${err.message}`)
	process.exit(-1)
});

app.use(morgan("dev"))
app.use(cors({origin: '*'}))
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', userRoute);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server listing at port: ${PORT} ...`)) // port
