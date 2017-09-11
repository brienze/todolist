import React, { Component } from 'react';
import ColumnList from './ColumnList.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {items:[]}
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  //before render.  Advisable place to setState, otherwise can occurr stack overflow
  componentWillMount(){
    const toDoListItems = window.localStorage.getItem('toDoListItems') || '[]';
    this.setState({items : JSON.parse( toDoListItems )});
    //(on console) localStorage.removeItem('toDoListItems')
  }

  updateLocalStorage(items){
    window.localStorage.setItem('toDoListItems',JSON.stringify(items));
  }

  addTask(e){
    e.preventDefault();
    const value = e.target.querySelector('input').value;
    this.setState(prev => {
      const {items=[]} = prev;
      const newTask = {
        id:items.length + 1,
        title: value,
        status: 'To Do'
      };
      items.push(newTask);
      this.updateLocalStorage(items);
      return {items:items}
    });
  }
  updateTask(target,task){
    this.setState( function (state){
      const {items = [] } = state;
      const s = items.filter(_ => _.id !== task.id)
      task.status = target.checked ? 'Done' : 'To Do';
      s.push(task);
      this.updateLocalStorage(items);
      return { items:s};
    });
  }
  render() {
    const {items = []} = this.state;
    const columns = [
      {title: 'To Do', items},//same as items:items
      {title: 'Done', items}
    ];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>To Do List</h2>
        </div>
        <div className="App-container">
          <div className="app-lists">
            {columns.map(item =>(
              <ColumnList
                key={item.title}
                title={item.title}
                items = {item.items}
                addTask={this.addTask}
                updateTask = {this.updateTask}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
