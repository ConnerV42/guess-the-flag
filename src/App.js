import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const style = {
      backgroundImage: `url(/Globe.jpg)`
    }
    return (
      <div className="App">
        <header className="title-header" style={style}>
          <h1 className="title-text">Guess The Flag</h1>
        </header>
      </div>
    );
  }
}

export default App;
