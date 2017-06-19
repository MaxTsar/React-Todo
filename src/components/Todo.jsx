import React, { Component } from 'react';
import Checkbox from './Checkbox.jsx';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.completed,
            edit: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.deleteId = this.deleteId.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.editMode = this.editMode.bind(this);
    }

    handleChange() {
        this.props.onStatusChange(this.props.id);
    }

    deleteId() {
        this.props.onDelete(this.props.id);
    }

    updateTodo() {
        this.props.onEdit(this.props.id, this.refs.todoEditValue.value);
        this.setState({edit: false});
    }

    editMode(e) {
        this.setState({edit: true});

    }

    render() {
        return (
            this.state.edit 
            ? 
            <div className={`todo-item${this.props.completed ? ' completed' : ''}`}>
                <input type="text" 
                    defaultValue={this.props.title} 
                    ref="todoEditValue" 
                    className="todo-edit" />
                <button type="submit" className="todo-save" onClick={this.updateTodo}></button>
            </div>
            :
            <div className={`todo-item${this.props.completed ? ' completed' : ''}`}>
                <Checkbox 
                    checked={this.props.completed} 
                    onChange={this.handleChange} />
                <span className="todo-item-text">{this.props.title}</span>
                <button className="icon" onClick={this.editMode}>
                    <div className="icon-edit"></div>
                </button>
                <button className="icon" onClick={this.deleteId}>
                    <div className="icon-delete"></div>
                </button>
            </div>
        );
    }
}
// "todo-item"
export default Todo;