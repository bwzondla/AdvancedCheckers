import React from 'react';
import ReactDOM from "react-dom";
class Graveyard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {grave:[]}
    }

    updateGrave(dead){
        this.setState({grave: dead});
    }
    render()
    {
        return (
            <div>
                <div>
                    Graveyard:
                </div>
                {this.state.grave}
            </div>
        );
    }
}

ReactDOM.render(<Graveyard />, document.getElementById("root"));

export default Graveyard;
