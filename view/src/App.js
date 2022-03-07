import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require('axios');

function App() {
	const [input, setInput] = useState('');
	const [id, setId] = useState('')
	const [editInput, setEditInput] = useState('');
	const [todoInEdit, setTodoInEdit] = useState('');
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	const getTodos = async () => {
		setIsLoading(true)
		const res = await axios.get('/todos');
		setTodos( res.data);
		setIsLoading(false)

	};

	useEffect(() => {	
	
		getTodos()
	}, []);

	const addTodoHandler = async (e) => {
		e.preventDefault();
		const res = await axios.post('/todo', {
			task: input,
			complete: false
		});
		if(res.status === 200){
			setTodos([...todos, res.data]);
			setInput('')
		}	
	};

	const markTodo = (todo, index) => {
		
	};

	const handleDelete = async (e, todo) => {
		e.preventDefault();
		try {
			const deleted = await axios.delete(`/todo/${todo._id}`)
			if(deleted.status === 200){
				setTodos(todos.filter((t) => t._id !== todo._id))
				
			}
			
		} catch (error) {
			console.error(error.message)
		}
	

	
	};
	const handleEdit = (e, index, todo, todoID, todos) => {
		let inputInEdit = document.getElementById('input' + todo.id);
		e.preventDefault();
		setId(todoID);
		setEditInput(inputInEdit);
		setTodoInEdit(todo);

		inputInEdit.disabled = false;

		for (let i = 0; i < todos.length; i++) {
			if (i !== index) {
				document.getElementById('button' + i).disabled = true;
			}
		}
		document.getElementById('savebtn').style = 'display:block;';
	};

	const saveEdit = (e) => {
		e.preventDefault();
		
	};

	return (
		<div className='app container'>
			<h1>
				TODO <span className='span-app'>APP</span>
			</h1>
			<form className='add-todo-form'>
				{todos.length === 0 && (
					<p className='alert alert-warning'>
						There are no todos in your task Manager
					</p>
				)}
				<input value={input} onChange={(e) => setInput(e.target.value)} />
				<button
					className='btn btn-primary'
					type='submit'
					disabled={!input}
					onClick={addTodoHandler}
				>
					Add Todo
				</button>
			</form>

			<Todo
				todos={todos}
				markTodo={markTodo}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				saveEdit={saveEdit}
			/>

			<footer>
				&copy; 2021 <a href='http://www.igbinobaro.com.ng'>Osaretin</a>
			</footer>
		</div>
	);
}

export default App;
