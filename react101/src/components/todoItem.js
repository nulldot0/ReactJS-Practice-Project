import React, { Component } from 'react'

class TodoItem extends Component {
    render() {
        return (
            <li className='list-group-item d-flex align-items-center justify-content-between' id={this.props.todo.id}>
                <div className="d-flex d-flex align-items-center">
                    <input className='mr-4' type='checkbox' onChange={this.props.handleTodoChange} checked={this.props.todo.completed ? 'completed' : ''} />
                    <p className="m-0" style={
                        {
                            textOverflow: 'ellipsis',
                            maxWidth: '80%',
                            textDecorationLine: this.props.todo.completed ? 'line-through': ''
                        }
                    }>{this.props.todo.title[0].toUpperCase() + this.props.todo.title.slice(1, this.props.todo.title.length)}</p>
                </div>
                <div>
                    <span onClick={this.props.handleDelete} style={{
                        cursor: "pointer"
                    }} className="close" >&times;</span>
                </div>
            </li>
        )
    }
}

export default TodoItem
