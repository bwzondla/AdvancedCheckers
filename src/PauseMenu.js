import React from 'react';
import './PauseMenu.css';
import ReactDOM from "react-dom";
let timerObject = null;
class Timer extends React.Component{

    constructor(props) {
        super(props);
    }

    render()
    {
        return (
            <div>
                <button className="button" >Restart</button>
                <button className="button" >Pause</button>
            </div>
        );
    }
}

ReactDOM.render(<Timer />, document.getElementById("root"));

export default Timer;
