import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Todo from './components/Todo.jsx';
import Stats from './components/Stats.jsx';
import Form from './components/Form.jsx';

// import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: this.getLocalStorage()
		};
	
		this.handleStatusChange = this.handleStatusChange.bind(this);
		this.delete = this.delete.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.setID = this.setID.bind(this);
		this.updateValue = this.updateValue.bind(this);
		this.setLocalStorage = this.setLocalStorage.bind(this);
		this.getLocalStorage = this.getLocalStorage.bind(this);
	}

	getLocalStorage() {
		let length = localStorage.length;
		if(length) {
			for(let i = 0; i < length; i++) {
				let item = localStorage.key(i);
				if(item === 'mytodolist') {
					return JSON.parse(localStorage.getItem(item));
				}
			}
		}
		return [];
	}

	setLocalStorage() {
		let todoList = JSON.stringify(this.state.todos);
		localStorage.setItem('mytodolist', todoList);
	}

// Change status of todo item, checkbox
	handleStatusChange(id) {
		let todoState = this.state.todos.map(function(item) {
			if(item.id === id) {
				item.completed = !item.completed;
			}
			return item;
		});
		this.setState({
			todos: todoState
		});
		this.setLocalStorage();
	}
// Delete todo item
	delete(id) {
		let todoState = this.state.todos.filter(function(item) {
			if(item.id !== id) {
				return item;
			}
		});
		this.setState({
			todos: todoState
		}, function() {
			this.setLocalStorage();
		});
	}

	setID() {
		let id = 0;
		if(this.state.todos.length === 0) return id;

		this.state.todos.forEach(function(item, i) {
			if(item.id > id) {
				id = item.id;
			}
		});
		return id+1;
	}

	addTodo(value) {
		if(value.length < 1) return;
		let todo = {
			id: this.setID(),
			title: value,
			completed: false
		};
		let todos = [...this.state.todos, todo];
		this.setState( {todos} );
		this.setLocalStorage();
	}

	updateValue(id, title) {
		let todos = this.state.todos.map((item) => {
			if(item.id === id) {
				item.title = title;
			}
			return item;
		});
		this.setState({ todos });
		this.setLocalStorage();
	}

	render() {
		return (
			<main>
				<h2 className="title">Ваш список задач</h2>
				<Form onAdd={this.addTodo} />
				<Stats todos={this.state.todos} />
				<ReactCSSTransitionGroup 
					component="section" 
					className="todo-list"
					transitionName="slide"
					transitionAppear={true}
					transitionAppearTimeout={600}
					transitionEnterTimeout={600}
					transitionLeaveTimeout={600}>
					{
						this.state.todos.map( item => 
							<Todo 
								key={item.id}
								id={item.id}
								title={item.title} 
								completed={item.completed} 
								onStatusChange={this.handleStatusChange}
								onDelete={this.delete} 
								onEdit={this.updateValue}/> )
					}
				</ReactCSSTransitionGroup>
			</main>
		);
	}
}
export default App;
