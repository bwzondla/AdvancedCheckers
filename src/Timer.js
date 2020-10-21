import React from 'react';
import './Timer.css';
import App from "./App";
import ReactDOM from "react-dom";

let timerObject = null;
class Timer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {time: 180};
    }

    startTimer(){
        if(!timerObject) {
            if (this.state.time <= 0){
                this.setState({time: 180})
            }
            timerObject = setInterval(this.startTimer.bind(this), 1000);
        } else {

            let clock = this.state.time;
            clock = clock - 1;
            this.setState({time:clock});
            if (this.state.time <= 0 ){
                this.stopTimer();
            }
        }
    }

    stopTimer(){
        clearInterval(timerObject);
        timerObject = null;
    }

    reset(){
        this.setState({time: 180});
    }

    render()
    {
        return (
            <div className="timer">
                <div className="vertical-center"  > {this.state.time}</div>
                <button className="small-button" onClick={this.stopTimer.bind(this)}> Stop </button>
                <button className="small-button"  onClick={this.startTimer.bind(this)}> Start </button>
                <button className="small-button"  onClick={this.reset.bind(this)}> Reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Timer />, document.getElementById("root"));

export default Timer;
