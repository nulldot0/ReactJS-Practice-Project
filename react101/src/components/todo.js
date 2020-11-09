import React, { Component } from 'react'
import $ from 'jquery/dist/jquery'
import TodoItem from './todoItem'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

class Todo extends Component {
    state = {
        searched: false,
        todos: []
    }

    componentDidMount = () => {
        axios.get('https://jsonplaceholder.typicode.com/todos/?_limit=10')
            .then(res => this.setState({ todos: res.data }))
    }

    handleDelete = e => {
        let parent = $(e.target).parentsUntil('.list-group').last()
        let todos = this.state.todos.filter(todo => {
            return parent.attr('id') != todo.id
        })
        this.setState({ todos: todos })
    }

    handleTodoChange = e => {
        let todoId = $(e.target).parentsUntil('.list-group').last().attr('id')
        let todos = this.state.todos.map(todo => {
            if (todo.id === todoId) todo.completed = !todo.completed
            return todo

        })

        this.setState({ todos: todos })
    }

    handleAdd = e => {
        let parent = $(e.target).parentsUntil('.jumbotron').last()
        let inp = $(parent.find('input'))

        if (inp.val()) {
            let todo = {
                id: uuidv4(),
                title: inp.val(),
                completed: false
            }

            inp.val('')

            this.setState({ todos: [todo, ...this.state.todos] })

            $(e.target).removeClass('btn-outline-danger')
            inp.removeClass('is-invalid')
        } else {
            $(e.target).addClass('btn-outline-danger')
            inp.addClass('is-invalid')
        }

    }

    getTodos = () => {
        if (this.state.todos.length !== 0) {
            if (this.props.searched) {
                let todos = this.state.todos.filter(todo => {
                    return todo.title.includes(this.props.searched)
                })

                if (todos.length !== 0) {
                    return (todos.map(todo => {
                        return <TodoItem key={todo.id} todo={todo} handleTodoChange={this.handleTodoChange} handleDelete={this.handleDelete} />
                    }))
                } else {
                    return (<li className="list-group-item">
                        <p className="text-center m-5">No todo found with "{this.props.searched}".</p>
                    </li>)
                }

            } else {
                return (this.state.todos.map(todo => {
                    return <TodoItem key={todo.id} todo={todo} handleTodoChange={this.handleTodoChange} handleDelete={this.handleDelete} />
                }))
            }
        } else {
            return (<li className="list-group-item">
                <p className="text-center m-5">No todo left.</p>
            </li>)
        }
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="jumbotron">
                    <h2 className="mb-4">Todo List App</h2>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Add new todo" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary" type="button" onClick={this.handleAdd}>Add</button>
                        </div>
                    </div>

                    <ul className="list-group">
                        {this.getTodos()}
                    </ul>
                </div>
            </div>
        )
    }
}


export default Todo