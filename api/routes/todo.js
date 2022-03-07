const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Todo = require('../../models/Todos');

router.get('/todos', async (req, res) => {
	try {
		const todos = await Todo.find();
		if (todos) return res.json(todos);
		res.status(400).json({ msg: 'There are no todos' });
	} catch (error) {
		console.error(error.message);
	}
});

router.post(
	'/todo',
	[check('task', 'Task cannot be empty').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { task } = req.body;
		try {
			let newTodo = new Todo({
				task,
				complete: false,
			});

			await newTodo.save();
			return res.json(newTodo);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

router.put(
	'/todo/:id',
	[check('task', 'task cannot be empty').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.json({ errors: errors.array() });
		const { task, complete } = req.body;
		const updatedTodo = {
			task,
			complete,
		};
		try {
			const todo = await Todo.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: updatedTodo },
				{ new: true }
			);
			if (todo) return res.json(todo);

			res.json({ msg: 'Todo does not exist' });
		} catch (error) {
			console.error(error.message);
			if (error.kind === 'ObjectId')
				return res.status(400).json({ msg: 'Todo does not exist' });
			res.status(500).send('Server Error');
		}
	}
);

router.delete('/todo/:id', async (req, res) => {
	try {
		await Todo.findByIdAndDelete({ _id: req.params.id });
		res.json({ msg: 'Todo has been successfully deleted.' });
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId')
			return res.status(400).json({ msg: 'Todo does not exist' });
		res.status(500).send('Server Error');
	}
});

module.exports = router;
