const User = require('../models/users')

// show the list of the users
const index = (req, res, next) => {
	User.find()
	.then(resp => res.json({resp}))
	.catch(err => res.json({err}))
}

// show the list of the single user
const show = (req, res, next) => {
	User.findById(req.body.userId)
	.then(resp => res.json({resp}))
	.catch(err => res.json({err}))
}

// create new user
const store = (req, res, next) => {
	let user = new User({
		name: req.body.name,
		email: req.body.email,
	})
	user.save()
	.then(() => res.json({
		mes: 'User added successfully!'
	}))
	.catch(err => res.json({err}))
}

// update the user
const update = (req, res, next) => {
	let updatedData = {
		name: req.body.name,
	}
	User.findByIdAndUpdate(req.body.userId, {$set: updatedData})
	.then(() => res.json({
		mes: 'User Updated successfully!'
	}))
	.catch(err => res.json({err}))
}

// delete the user
const destroy = (req, res, next) => {
	User.findByIdAndRemove	(req.body.userId)
	.then(() => res.json({
		mes: 'User Deleted successfully!'
	}))
	.catch(err => res.json({err}))
}

module.exports = {
	index, show, store, update, destroy
}