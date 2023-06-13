const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
	fullName: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	contactNumber: {
		type: String,
		default: ''
	},
	resume: {
		type: [],
	}
}, {timestamps: true})


module.exports = mongoose.model("Post", postSchema)