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

        //if white turn and select black piece, nothing happens
        if (parentState.pTurn === true & this.props.side === 1)
        {
            return
        }

        //if black turn and select white piece, nothing happens
        if (parentState.pTurn === false & this.props.side === 0)
        {
            return
        }
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
                    <span className={"tooltiptext"}>{this.props.x},{this.props.y}</span>
                </div>
            </div>

        );
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tileSelected: 0, tile1: null, gameState: this.createEmptyBoard(), moveCount: 0, pTurn: true};
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
                this.state.pTurn = !this.state.pTurn; // Switches player turn
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

        tempMatrix[x2][y2] = {x:x2,y:y2,tileColor: tempMatrix[x2][y2].tileColor, part: tempMatrix[x1][y1].part, side: tempMatrix[x1][y1].side}
        tempMatrix[x1][y1] = {x:x1,y:y1, tileColor: tempMatrix[x1][y1].tileColor, part: -1, side: -1}
        console.log(tempMatrix)
        this.setState({gameState: tempMatrix, moveCount: this.moveCount + 1})

    }

    isValidMove(p1, xy1, p2, xy2){
        let x = parseInt(xy1[0], 10)
        let y = parseInt(xy1[1], 10)
        let side = p1.props.side
        console.log(p1.props.part)
        let board = this.state.gameState

        let validMoves = []



        //is pawn
        if (p1.props.part === 0){
            //is white pawn
            if (p1.props.side === 0) {
                if (board[x - 1][y].part === -1) {
                    validMoves.push((x-1).toString() + y.toString())
                    if ( x === 6){
                        if (board[x - 2][y].part === -1){
                            validMoves.push((x-2).toString() + y.toString())
                        }
                    }
                }

                if (y - 1 >= 0) {
                    if (board[x - 1][y - 1].side != -1 & board[x - 1][y - 1].side != side) {
                        validMoves.push((x - 1).toString() + (y - 1).toString())
                    }
                }
                if (y + 1 <= 7) {
                    if (board[x - 1][y + 1].side != -1 & board[x - 1][y + 1].side != side) {
                        validMoves.push((x - 1).toString() + (y - 1).toString())
                    }

                }
            }

            //is black pawn
            if( p1.props.side === 1){
                if (board[x + 1][y].part === -1) {
                    validMoves.push((x+1).toString() + y.toString())
                    if ( x === 1){
                        if (board[x + 2][y].part === -1){
                            validMoves.push((x+2).toString() + y.toString())
                        }
                    }
                }

                if (y - 1 >= 0) {
                    if (board[x + 1][y - 1].side != -1 & board[x + 1][y - 1].side != side) {
                        validMoves.push((x + 1).toString() + (y - 1).toString())
                    }
                }
                if (y + 1 <= 7) {
                    if (board[x + 1][y + 1].side != -1 & board[x + 1][y + 1].side != side) {
                        validMoves.push((x + 1).toString() + (y - 1).toString())
                    }
                }
            }

        }
        //end pawn

        //begin rook
        if(p1.props.part === 1){
            //same for both sides
            for(let i = x + 1; i <= 7; i++){
                if(board[i][y].part != -1 ){
                    if (board[i][y].side != side ){
                        validMoves.push((i).toString() + y.toString())
                    }
                    break
                } else {
                    validMoves.push((i).toString() + y.toString())
                }
            }

            for(let i = x - 1; i >= 0; i--){
                if(board[i][y].part != -1 ){
                    if (board[i][y].side != side ){
                        validMoves.push((i).toString() + y.toString())
                    }
                    break
                } else {
                    validMoves.push((i).toString() + y.toString())
                }
            }

            for(let i = y - 1; i >= 0; i--){
                if(board[x][i].part != -1 ){
                    if (board[x][i].side != side ){
                        validMoves.push((x).toString() + i.toString())
                    }
                    break
                } else {
                    validMoves.push((x).toString() + i.toString())
                }
            }

            for(let i = y + 1; i <= 7; i++){
                if(board[x][i].part != -1 ){
                    if (board[x][i].side != side ){
                        validMoves.push((x).toString() + i.toString())
                    }
                    break
                } else {
                    validMoves.push((x).toString() + i.toString())
                }
            }

        }

        //knight
        if( p1.props.part === 2){

            if( y - 2 >= 0){
                if (x - 1 >= 0){
                    if(board[x - 1][y - 2].side != side){
                        validMoves.push((x - 1).toString() + (y-2).toString())
                    }
                }
                if (x + 1 <= 7){
                    if(board[x+1][y-2].side != side){
                        validMoves.push((x + 1).toString() + (y-2).toString())

                    }
                }
            }

            if (y + 2 <= 7){
                if (x - 1 >= 0){
                    if(board[x - 1][y + 2].side != side){
                        validMoves.push((x - 1).toString() + (y+2).toString())
                    }
                }
                if (x + 1 <= 7){
                    if(board[x+1][y+2].side != side){
                        validMoves.push((x + 1).toString() + (y+2).toString())

                    }
                }
            }

            if (x + 2 <= 7){
                if (y - 1 >= 0){
                    if(board[x + 2][y - 1].side != side){
                        validMoves.push((x + 2).toString() + (y - 1).toString())
                    }
                }
                if (y + 1 <= 7){
                    if(board[x + 1][y + 1].side != side){
                        validMoves.push((x + 2).toString() + (y + 1 ).toString())

                    }
                }
            }

            if (x - 2 >= 0){
                if (y - 1 >= 0){
                    if(board[x - 2][y - 1].side != side){
                        validMoves.push((x - 2).toString() + (y - 1).toString())
                    }
                }
                if (y + 1 <= 7){
                    if(board[x - 2][y + 1].side != side){
                        validMoves.push((x - 2).toString() + (y + 1 ).toString())

                    }
                }
            }
            //end knight
        }

        //bishop
        if( p1.props.part === 3){
            let i = x - 1
            let j = y - 1
            while( i >= 0 & j>=0){
                if(board[i][j].part != -1 ){
                    if (board[i][j].side != side ){
                        validMoves.push((i).toString() + j.toString())
                    }
                    break
                } else{
                    validMoves.push((i).toString() + j.toString())
                }
                i = i - 1
                j = j - 1
            }

            i = x + 1
            j = y - 1
            while( i <=7  & j>=0){
                if(board[i][j].part != -1 ){
                    if (board[i][j].side != side ){
                        validMoves.push((i).toString() + j.toString())
                    }
                    break
                } else{
                    validMoves.push((i).toString() + j.toString())
                }
                i = i + 1
                j = j - 1
            }

            i = x - 1
            j = y + 1
            while( i >= 0  & j <= 7){
                if(board[i][j].part != -1 ){
                    if (board[i][j].side != side ){
                        validMoves.push((i).toString() + j.toString())
                    }
                    break
                } else{
                    validMoves.push((i).toString() + j.toString())
                }
                i = i - 1
                j = j + 1
            }

            i = x + 1
            j = y + 1
            while( i <= 7  & j <= 7){
                if(board[i][j].part != -1 ){
                    if (board[i][j].side != side ){
                        validMoves.push((i).toString() + j.toString())
                    }
                    break
                } else{
                    validMoves.push((i).toString() + j.toString())
                }
                i = i + 1
                j = j + 1
            }
        }

        //queen
        if(p1.props.part === 4){
            for(let i = x + 1; i <= 7; i++){
                if(board[i][y].part != -1 ){
                    if (board[i][y].side != side ){
                        validMoves.push((i).toString() + y.toString())
                    }
                    break
                } else {
                    validMoves.push((i).toString() + y.toString())
                }
            }

            for(let i = x - 1; i >= 0; i--){
                if(board[i][y].part != -1 ){
                    if (board[i][y].side != side ){
                        validMoves.push((i).toString() + y.toString())
                    }
                    break
                } else {
                    validMoves.push((i).toString() + y.toString())
                }
            }

            for(let i = y - 1; i >= 0; i--){
                if(board[x][i].part != -1 ){
                    if (board[x][i].side != side ){
                        validMoves.push((x).toString() + i.toString())
                    }
                    break
                } else {
                    validMoves.push((x).toString() + i.toString())
                }
            }

            for(let i = y + 1; i <= 7; i++){
                if(board[x][i].part != -1 ){
                    if (board[x][i].side != side ){
                        validMoves.push((x).toString() + i.toString())
                    }
                    break
                } else {
                    validMoves.push((x).toString() + i.toString())
                }
            }


            let i = x - 1
            let j = y - 1
            while( i >= 0 & j>=0){
                if(board[i][j].part != -1 ){
                    if (board[i][j].side != side ){
                        validMoves.push((i).toString() + j.toString())
                    }
                    break
                } else{
                    validMoves.push((i).toString() + j.toString())
                }
                i = i - 1
                j = j - 1
            }

            i = x + 1
            j = y - 1
            while( i <=7  & j>=0){
                if(board[i][j].part != -1 ){
                    if (board[i][j].side != side ){
                        validMoves.push((i).toString() + j.toString())
                    }
                    break
                } else{
                    validMoves.push((i).toString() + j.toString())
                }
                i = i + 1
                j = j - 1
            }

            i = x - 1
            j = y + 1
            while( i >= 0  & j <= 7){
                if(board[i][j].part != -1 ){
                    if (board[i][j].side != side ){
                        validMoves.push((i).toString() + j.toString())
                    }
                    break
                } else{
                    validMoves.push((i).toString() + j.toString())
                }
                i = i - 1
                j = j + 1
            }

            i = x + 1
            j = y + 1
            while( i <= 7  & j <= 7){
                if(board[i][j].part != -1 ){
                    if (board[i][j].side != side ){
                        validMoves.push((i).toString() + j.toString())
                    }
                    break
                } else{
                    validMoves.push((i).toString() + j.toString())
                }
                i = i + 1
                j = j + 1
            }
        }

        if( p1.props.part === 5){
            if( x - 1 >= 0){
                if( board[x-1][y].side != side){
                    validMoves.push((x-1).toString() + y.toString())
                }
                if( y-1 >= 0) {
                    if (board[x - 1][y - 1].side != side) {
                        validMoves.push((x - 1).toString() + (y - 1).toString())
                    }
                }
                if(y + 1 <= 7) {
                    if (board[x - 1][y + 1].side != side) {
                        validMoves.push((x - 1).toString() + (y + 1).toString())
                    }
                }
            }

            if(x + 1 <= 7){
                if( board[x+1][y].side != side){
                    validMoves.push((x+1).toString() + y.toString())
                }
                if( y-1 >= 0) {
                    if (board[x + 1][y - 1].side != side) {
                        validMoves.push((x + 1).toString() + (y - 1).toString())
                    }
                }
                if(y + 1 <= 7) {
                    if (board[x + 1][y + 1].side != side) {
                        validMoves.push((x + 1).toString() + (y + 1).toString())
                    }
                }
            }

            if( y - 1 >= 0){
                if( board[x][y - 1].side != side){
                    validMoves.push((x).toString() + (y - 1).toString())
                }
            }

            if( y + 1 <= 7){
                if( board[x][y + 1].side != side){
                    validMoves.push((x).toString() + (y + 1).toString())
                }
            }

        }



        //end rook
        console.log(validMoves)

        if(validMoves.includes(xy2)){

            return true;
        }
        return false;
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
