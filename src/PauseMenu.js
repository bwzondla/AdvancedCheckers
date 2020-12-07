import React from 'react';
import './PauseMenu.css';
import ReactDOM from "react-dom";
let timerObject = null;
class PauseMenu extends React.Component{

    constructor(props) {
        super(props);

    }

    pauseClick(){
        this.props.pause.current.stopTimer()
        alert("GAME PAUSED")
        this.props.pause.current.startTimer()
    }

    render()
    {
        return (
            <div>
                <button className="button" onClick ={() => window.location.reload(false)}>Restart</button>
                <button className="button" onClick={this.pauseClick.bind(this)}>Pause</button>
            </div>
        );
    }
}

ReactDOM.render(<PauseMenu />, document.getElementById("root"));

export default PauseMenu;
