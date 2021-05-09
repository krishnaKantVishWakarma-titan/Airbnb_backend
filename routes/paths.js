const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
router.use(bodyParser.json())
const UserController = require("../controllers/users")

router.get('/api/users', UserController.index)

router.post('/api/register', UserController.register)
router.post('/api/login', UserController.login)

module.exports = router;