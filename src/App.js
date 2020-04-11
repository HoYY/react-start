import React from 'react';
import logo from './logo.svg';
import './App.css';
Preference
class App extends React.Component {
  state = {
    count: 0
  };

  add = () => {
    this.setState(current => ({count: current.count + 1}));
  };

  minus = () => {
    this.setState(current => ({ count: current.count - 1 }));
  };

  render() {
    return (
        <div>
          <h1>Count: {this.state.count}</h1>
          <button onClick={this.add}>Add</button>
          <button onClick={this.minus}>Minus</button>
        </div>
    );
  }
}

export default App;
