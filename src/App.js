import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';
import Timer from './Timer';
import PauseMenu from './PauseMenu'
function App() {
  /*
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );

   */
  return (
      <div>
        <div>
          <Board></Board>
        </div>
        <div>
          <PauseMenu></PauseMenu>
        </div>
        <div>
          <Timer></Timer>
        </div>
      </div>
  )
}

export default App;
