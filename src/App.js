import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';
import Timer from './Timer';
import PauseMenu from './PauseMenu';
import Piece from './Piece';
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
    let reference = React.createRef()
    let timer = <Timer ref = {reference}></Timer>

  return (
      <div className={"background"}>
          <div className={"header"}>
              <p>Chess</p>
              <PauseMenu pause = {reference}></PauseMenu>
          </div>

          <div className={"row"}>

              <div className={"column side"}>
                  {timer}
              </div>
              <div className={"column middle"}>
                  <Board></Board>
              </div>
              <div className={"column side"}>
                  GraveYard
              </div>
          </div>
      </div>
  )
}

export default App;
