const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
	task: {
		type: String,
		required: true,
	},
	complete: {
		type: Boolean,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('todo', TodoSchema);
