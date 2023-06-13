const User = require('../models/users')

const test = (req, res, next) => {
	res.json({
		status: 1
	})
}


// show the list of the users
const index = (req, res, next) => {
	User.find({}, {password: 0})
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
			.then(() => {
				const userObject = {
					_id: user._id,
					name: user.name,
					email: user.email,
				}
				console.log("userobj",userObject)
				res.json({
					code: 200,
					mes: 'User added successfully!',
					data: userObject
				})
			})
			.catch(err => res.json({err: err}))
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
				const userObject = {
					_id: resp._id,
					name: resp.name,
					email: resp.email,
				}
				res.json({code: 200, mes: "User exist", data: userObject})
			} else {
				res.json({code: 402, mes: "Wrong credentials"})
			}
		}
	})
	.catch(err => res.json({err}))
}

// update the basic user
const updateBasic = (req, res, next) => {
	
	let updatedData = {
		name: req.body.name,
		professional: req.body.professional,
		about: req.body.about,
		dob: req.body.dob,
	}
	User.findByIdAndUpdate(req.body.userId, {$set: updatedData})
	.then(() => res.json({
		mes: 'User Updated successfully!'
	}))
	.catch(err => res.json({err}))
}

// update the profile pic 
const updatePic = (req,res, next)=>{
	let updatedPic = {
		profilePic: req.body.picurl,
	}
	User.findByIdAndUpdate(req.body.userId, {$set: updatedPic})
	.then(()=> res.json({
		mes: 'Profile pic updated !'
	}))
	.catch(err=> res.json({err}))
}

// update educational details
const updateEducation = (req, res, next)=>{
	let updatedEducation = {
		education : req.body.education
	}
	User.findByIdAndUpdate(req.body.userId, {$set : updatedEducation})
	.then(()=> res.json({
		mes : 'Educational details updated! '
	}))
	.catch(err => res.json({err}))
}

// update Address details
const updateAddress = (req, res, next)=>{
	let updateaddress = {
		country : req.body.country,
		state : req.body.state,
		city : req.body.city,

	}
	User.findByIdAndUpdate(req.body.userId, {$set: updateaddress})
	.then(()=> res.json({
		mes : 'Addess updated!'
	}))
	.catch(err => res.json({err}))
}

// update password
const updatepassword = (req, res, next) => {
	// find user
	User.findOne({ email: req.body.email })
	.then(resp => {
		// matching pass's
		if (resp.password === req.body.oldPassword) {
			// update new pass
			User.findByIdAndUpdate(resp._id, {$set: {password: req.body.newPassword}})
			.then(()=> res.json({code: 200, mes: "pass updated"}))
			.catch(err => res.json({err}))
		} else {
			res.json({code: 402, mes: "Wrong credentials"})
		}
	})
	.catch(err => res.json({err}))
}
// delete the user
const destroy = (req, res, next) => {
	User.findByIdAndRemove(req.body.userId)
	.then(() => res.json({
		mes: 'User Deleted successfully!'
	}))
	.catch(err => res.json({err}))
}

const example = (req, res, next) => {
	res.json("done")
}

module.exports = {
	index, show, register,login,  updateBasic, updatePic, updateEducation, updatepassword,  destroy, example, test
}