import React from 'react';
import './Board.css';
import App from "./App";

let time = 3
let timer = null

class Timer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {time: 0}
    }

    componentDidMount() {
        this.startTimer()
    }

    componentWillUnmount() {
        this.stopTimer()
    }

    startTimer(){
        time = 3
        timer = setInterval(this.countdown, 1000 );
    }



    stopTimer(){
        if (timer){
            clearInterval(timer);
            timer = null;
        }
    }

    reset(){
        time = 3;

    }

    countdown(){
        let clock = time;
        clock = clock - 1;
        time = clock;
        //this.setState({time:clock});
        if (time <=0 ){
            this.stopTimer();
        }
    }
    render()
    {
        return (
            <div>
                <h2 > {time}</h2>
                <button onClick={this.stopTimer.bind(this)}> Stop </button>
                <button onClick={this.startTimer.bind(this)}> Start </button>
                <button onClick={this.reset.bind(this)}> Reset</button>
            </div>
        );
    }
}
export default Timer;
