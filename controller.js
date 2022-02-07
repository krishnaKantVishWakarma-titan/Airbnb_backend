const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
router.use(bodyParser.json())

// testing routes
router.get('/api/test', (req, res, next) => {
	res.json({
		status: 2
	})
});
router.post('/api/test', (req, res, next) => {
	res.json({
		status: 2
	})
});


module.exports = router;