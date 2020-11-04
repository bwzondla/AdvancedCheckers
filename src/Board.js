import React from 'react';
import './Board.css';
import ReactDOM from "react-dom";
import Piece from "./Piece";
import ChessPiece from "./Piece";


class Tile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {current: <ChessPiece part = {props.part} side = {props.side}/>};
        this.changeState = this.changeState.bind(this)
        this.doState = this.doState.bind(this)
        this.xy = this.props.x.toString() + this.props.y.toString()
    }



    selectSquare()
    {
        var parentState = this.props.getParentState();
        if (parentState.tileSelected === 0 & this.props.part === -1){
            return
        }
        this.props.updateParentState(this)
    }

    doState(){
        var parentState = this.props.getParentState();
        this.setState({past: this.state.current, current: parentState.tile1.state.current})
    }

    changeState(){
        this.setState({past: this.state.current, current: <ChessPiece part = {-1} side = {-1}/>})
        //this
    }



    render()
    {

        return (
            <div
                className={this.props.tileColor == "#484848" ? 'tile black' : 'tile white'}
                onClick={this.selectSquare.bind(this)}
                x = {this.props.x}
                y = {this.props.y}
                piece = {this.props.piece}
                >
                <div className={"tooltip"}> {this.state.current}
                    <span className={"tooltiptext"}>{this.props.part},{this.props.side}</span>
                </div>
            </div>

        );
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tileSelected: 0, tile1: null, gameState: this.createEmptyBoard(), moveCount: 0};
    }


    render(){
        return (
            <div className={"board"}>{this.state.tileSelected}
                {this.renderBoard(this.state.gameState)}
                {this.state.moveCount}
            </div>
        )
    }

    getState(){
        return this.state;
    }

    updateState(tile, newRef){
        if(this.state.tileSelected === 0){
            this.setState({tileSelected: 1, tile1: tile})

        }else {

            if(this.isValidMove(this.state.tile1, this.state.tile1.xy, tile, tile.xy)){
                this.changeGameState(this.state.tile1.xy, tile.xy)
                tile.doState()
                this.state.tile1.changeState()
            }
            this.setState({tileSelected: 0, tile1: "", tile2: ""})


        }
    }

    createEmptyBoard(){
        let matrix = [];
        for (let i = 0; i < 8; i++){
            matrix.push([]);
            for (let j = 0; j < 8; j++){
                let color = "#2f51c4";
                if ((i & 1) === 0 && (j & 1) === 1){
                    color = "#484848";
                } else if ((i & 1) === 1 && (j & 1) === 0){
                    color = "#484848";
                }

                matrix[i][j] = {
                    x:i,
                    y:j,
                    tileColor:color,
                    part: this.checkStartPiece(i,j),
                    side: this.checkSide(i)
                }
            }
        }
        return matrix;
    }

    renderBoard(matrix){
        return matrix.map( (row) => {
            return row.map( (item) => {
                return (
                    <div
                        key = {item.x * row.length + item.y}>
                        <Tile
                            getParentState = {this.getState.bind(this)}
                            updateParentState = {this.updateState.bind(this)}
                            name = {item.x + item.y}
                            value = {item}
                            x = {item.x}
                            y = {item.y}
                            tileColor = {item.tileColor}
                            part = {item.part}
                            side = {item.side}

                        />
                        {(row[row.length - 1] === item) ? <div className="clear"/> : ""}
                    </div>);
            })
        });
    }


    changeGameState(from, to){
        //parse

        let x1 = parseInt(from[0], 10)
        let y1 = parseInt(from[1], 10)
        let x2 = parseInt(to[0], 10)
        let y2 = parseInt(to[1], 10)

        let tempMatrix = this.state.gameState
        console.log(x1.toString() +  y1.toString())
        console.log(x2.toString() +  y2.toString())

        console.log(tempMatrix[x1][y1].part.toString() + " " + tempMatrix[x1][y1].side)
        tempMatrix[x2][y2] = {x:x2,y:y2,tileColor: tempMatrix[x2][y2].tileColor, part: tempMatrix[x1][y1].part, side: tempMatrix[x1][y1].side}
        tempMatrix[x1][y1] = {x:x1,y:y1, tileColor: tempMatrix[x1][y1].tileColor, part: -1, side: -1}
        this.setState({gameState: tempMatrix, moveCount: this.moveCount + 1})
        console.log(this.state.gameState === this.createEmptyBoard())

    }

    isValidMove(p1, xy1, p2, xy2){
        return true;
    }

    checkStartPiece(x, y){
        if(x === 1 | x === 6){
            //pawn
            return 0;
        }
        if( x === 0){
            if (y === 0 | y === 7){
                //rook
                return 1;
            }
            if (y === 1 | y === 6){
                //knight
                return 2;
            }
            if (y === 2 | y === 5){
                //bishop
                return 3;
            }
            if (y === 3){
                //king
                return 4;
            }
            if (y === 4){
                //queen
                return 5;
            }

        }

        if (x === 7){
            if (y === 0 | y === 7){
                return 1;
            }
            if (y === 1 | y === 6){
                return 2;
            }
            if (y === 2 | y === 5){
                return 3;
            }
            if (y === 3){
                return 4;
            }
            if (y === 4){
                return 5;
            }
        }

        return -1;
    }

    checkSide(x){
        if(x <= 1){
            return 1;
        }
        if (x >= 6){
            return 0;
        }
        return -1;
    }

}
ReactDOM.render(<Board />, document.getElementById("root"));

export default Board;
