const express = require("express")
const router = express.Router()

const UserController = require("../controllers/users")

router.get('/', UserController.index)
router.post('/single', UserController.show)

router.get('/store', UserController.store)

module.exports = router;