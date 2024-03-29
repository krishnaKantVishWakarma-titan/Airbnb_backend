const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	name: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	country: {
		type: String,
		default: ''
	},
	state: {
		type: String,
		default: ''
	},
	city: {
		type: String,
		default: ''
	},
	profession: {
		type: String,
		default: ''
	},
	about: {
		type: String,
		default: ''
	},
	dob: {
		type: String,
		default: Date.now
	},
	education: {
		type : String,
		default: ''
	},
	skills: {
		type: [],
	},
	interest: {
		type: [],
	},
	profilePic: {
		type: String
	},
	role: {
		type: String
	}
}, {timestamps: true})


module.exports = mongoose.model("User", userSchema)