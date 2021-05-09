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

// create new user (register)
const register = (req, res, next) => {
	console.log(req.body)
	User.findOne({email: req.body.email})
	.then(resp => {
		if (resp != null) {
			res.json({code: 401, mes: "User exist"})
		} else {
			let user = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			})
			user.save()
			.then(() => res.json({
				code: 200,
				mes: 'User added successfully!',
				data: user
			}))
			.catch(err => res.json({err}))
		}
	})
	.catch(err => res.json({err}))
}

// login
const login = (req, res, next) => {
	console.log(req.body)
	User.findOne({ email: req.body.email })
	.then(resp => {
		if (resp === null) {
			res.json({code: 401, mes: "User not exist"})
		} else {
			if (resp.password === req.body.password) {
				res.json({code: 200, mes: "User exist", data: resp})
			} else {
				res.json({code: 402, mes: "Wrong credentials"})
			}
		}
	})
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
	index, show, register, update, destroy, login
}