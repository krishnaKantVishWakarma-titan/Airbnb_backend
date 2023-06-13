const Post = require('../models/posts')

// show the list of the users
const index = (req, res, next) => {
	Post.find()
	.then(resp => res.json({resp}))
	.catch(err => res.json({err}))
}

// show the list of the single user
const show = (req, res, next) => {
	Post.findById(req.body.email)
	.then(resp => res.json({resp}))
	.catch(err => res.json({err}))
}

// create post
const post = (req, res, next) => {
	let post = new Post({
		fullName: req.body.fullName,
		email: req.body.email,
		contactNumber: req.body.contactNumber,
		resume: req.body.resume,
	})
	post.save()
	.then(() => {
		res.json({
			code: 200,
			mes: 'post added'
		})
	})
	.catch(err => res.json({err: err}))
}

module.exports = {
	index, show, post
}