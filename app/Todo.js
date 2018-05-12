const mongoose = require('mongoose');


// Define collection and schema for todo item.
const todo = new mongoose.Schema(
	{
		name: { type: String },
		done: { type: Boolean },
	},
	{
		collection: 'todos'
	}
);

module.exports = mongoose.model('Todo', todo);
