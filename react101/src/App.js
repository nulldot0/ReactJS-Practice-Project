import React, { Component } from 'react'
import Header from './components/header'
import Todo from './components/todo'

class App extends Component {
  state ={
    searched: false
  }
  
  handleSearch = (e) => {
    let infoQ = e.target.value
    this.setState({searched: infoQ ? infoQ : false })
  }

  render() {
    return (
      <div>
         <Header handleSearch={this.handleSearch}/>
         {this.state.searched ? <Todo searched={this.state.searched}/> : <Todo />}
      </div>
    )
  }
}
export default App