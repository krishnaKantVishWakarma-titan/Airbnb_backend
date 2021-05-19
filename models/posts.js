const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
	username: {
		type: String,
		default: ''
	},
	caption: {
		type: String,
		default: ''
	},
	picture: {
		type: String,
		default: ''
	},
	like: {
		type: [],
	},
	comment: {
		type: [],
	}
}, {timestamps: true})


module.exports = mongoose.model("Post", userSchema)