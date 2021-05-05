const express = require("express")
const app = express()
const userRoute = require("./routes/paths.js")
const morgan = require("morgan")
const dotenv = require("dotenv")
var cors = require('cors')
const mongoose = require('mongoose')

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
.then(() => console.log("Connected to mongoose ..."))
.catch(err => {
	console.log(`db error ${err.message}`)
	process.exit(-1)
});

app.use(morgan("dev"))
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:8080'}))
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080")
    next()
});
app.use('/', userRoute)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server listing at port: ${PORT} ...`)) // port
