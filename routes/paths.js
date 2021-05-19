const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
router.use(bodyParser.json())
const UserController = require("../controllers/users")
const PostsController = require("../controllers/posts")

router.get('/api/users', UserController.index)
router.get('/api/example', UserController.example)

router.post('/api/register', UserController.register)
router.post('/api/login', UserController.login)

router.get('/api/post', PostsController.index)
router.post('/api/post/show', PostsController.show)
router.post('/api/post/new', PostsController.post)

module.exports = router;