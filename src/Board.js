import React from 'react';
import './Board.css';
import ReactDOM from "react-dom";
import ChessPiece from "./Piece";


class Tile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {current: <ChessPiece part = {props.part} side = {props.side} isSelected = {false}/>};
        this.changeState = this.changeState.bind(this)
        this.doState = this.doState.bind(this)
        this.selectTile = this.selectTile.bind(this)
        this.deselectTile = this.deselectTile.bind(this)
        this.xy = this.props.x.toString() + this.props.y.toString()
    }
    
    seltile = s => this.setState({isSelected: !this.state.isSelected})

    //runs anytime any state changes in any component
    componentDidUpdate(prevProps)
    {
        //if this tile is not selected
        if(this.state.isSelected === false)
        {
            //loop through board's select list. if this tile's xy is in it, highlight it
            for(var i = 0; i < this.props.getParentState().sel.length; i++)
            {
                if(this.props.getParentState().sel[i] === this.xy)
                {
                    this.selectTile()
                }
            }
        }
        else//if this tile is selected
        {
            //loop through board's deselect list. if this tile's xy is in it. unhighlight it
            for(var i = 0; i < this.props.getParentState().desel.length; i++)
            {
                if(this.props.getParentState().desel[i] === this.xy)
                {
                    this.deselectTile() 
                }
            }
        }
        
    }
    
    selectTile()
    {
        //change tile to highlighted state
        this.setState({isSelected: true})
    }
    
    deselectTile()
    {
        //change tile to normal color
        this.setState({isSelected: false})
    }

    selectSquare()
    {
        //Board's state
        var parentState = this.props.getParentState();

        //if white turn and select black piece, nothing happens
        if (parentState.pTurn === true & this.props.side === 1 & parentState.tileSelected === 0)
        {
            return
        }

        //if black turn and select white piece, nothing happens
        if (parentState.pTurn === false & this.props.side === 0 & parentState.tileSelected === 0)
        {
            return
        }
        if (parentState.tileSelected === 0 & this.props.part === -1){
            return
        }
        this.selectTile()
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
        if(!this.state.isSelected)//render tile as normal
        {
            return (
            <div
                className={this.props.tileColor === "#484848" ? 'tile black' : 'tile white'}
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
        else//render tile as highlighted background
        {
            return(
            <div
                className={'tile selected'}
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
}

class Board extends React.Component {
//Board is Love Board is Life
    constructor(props) {
        super(props);
        this.state = {tileSelected: 0, tile1: null, gameState: this.createEmptyBoard(), moveCount: 0, sel: [], desel: [], update: 0, pTurn: true, inCheck: false};
    }


    render(){
        return (
            <div className={"board"}>{this.state.tileSelected}
                {this.state.inCheck.toString()}
                {this.renderBoard(this.state.gameState)}
            </div>
        )
    }

    getState(){
        return this.state;
    }

    updateState(tile, newRef){
        if(this.state.tileSelected === 0){
            this.setState({tileSelected: 1, tile1: tile})
            this.updateSelectedSelect(tile)
            tile.selectTile()

        }else {

            if(this.isValidMove(this.state.tile1, this.state.tile1.xy, tile, tile.xy)){
                this.changeGameState(this.state.tile1.xy, tile.xy)
                this.setState({inCheck: this.checkMoveCheck(tile.xy, tile, this.state.gameState)})
                tile.doState()
                this.state.tile1.changeState()
                this.state.pTurn = !this.state.pTurn; // Switches player turn
            }
            this.updateSelectedDeselect(this.state.tile1)
            tile.deselectTile()
            this.state.tile1.deselectTile()
            this.setState({tileSelected: 0, tile1: "", tile2: ""})


        }
    }

    updateSelectedSelect(tile)
    {
        let moves = []
        moves = this.getValidMoves(tile, tile.xy, this.state.gameState)
        //clear the deselect list
        this.state.desel = []
        //cycle through all tiles. if it is a valid move, add it to the select list
        for(let i = 0; i < 8; i++)
        {
            for(let j = 0; j < 8; j++)
            {             
                if(moves.includes(i.toString() + j.toString()))
                {
                    this.state.sel.push(i.toString() + j.toString())  
                }
            }
        }
        this.state.update++
    }

    updateSelectedDeselect(tile)
    {
        let moves = []
        moves = this.getValidMoves(tile, tile.xy, this.state.gameState)
        //add all selected tiles to the deselect list and clear select list
        this.state.desel = this.state.sel
        this.state.sel = []
        this.state.update--
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
                    side: this.checkSide(i),
                }
            }
        }
        return matrix;
    }

    renderBoard(matrix){
        return matrix.map( (row) => {
            return row.map( (item) => {
                let obj = <Tile
                    key = {item.x * 8 + item.y}
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
                let div = <div
                    id = {item.x.toString() + item.y.toString()}
                    key = {item.x * row.length + item.y}>
                    {obj}
                    {(row[row.length - 1] === item) ? <div className="clear"/> : ""}
                    </div>
                return (
                       div
                );
            })
        });  
    }


    changeGameState(from, to){
        //parse

        let x1 = parseInt(from[0], 10)
        let y1 = parseInt(from[1], 10)
        let x2 = parseInt(to[0], 10)
        let y2 = parseInt(to[1], 10)

        let tempMatrix = [...this.state.gameState]

        tempMatrix[x2][y2] = {x:x2,y:y2,tileColor: tempMatrix[x2][y2].tileColor, part: tempMatrix[x1][y1].part, side: tempMatrix[x1][y1].side}
        tempMatrix[x1][y1] = {x:x1,y:y1, tileColor: tempMatrix[x1][y1].tileColor, part: -1, side: -1}
        //console.log(tempMatrix)
        this.setState({gameState: tempMatrix, moveCount: this.moveCount + 1})

    }

    isValidMove(p1, xy1, p2, xy2)
    {

        if(this.getValidMoves(p1, xy1, this.state.gameState).includes(xy2)){

            // if this gets triggered then the move you wanted to do makes your king in check
            if (this.checkAllPiecesIfCheck(p1, xy2)) {
                return false

            }
            return true;
        }
        return false;
    }

    getValidMoves(p1, xy1, matrix, checkingMove = false){
        let x = parseInt(xy1[0], 10)
        let y = parseInt(xy1[1], 10)
        let side = null
        let part = null
        if (checkingMove){
            side = p1.side
            part = p1.part
        } else {
            side = p1.props.side
            part = p1.props.part
        }
        let board = matrix

        let validMoves = []



        //is pawn
        if (part === 0){
            //is white pawn
            if (side === 0) {
                if (board[x - 1][y].part === -1) {
                    validMoves.push((x-1).toString() + y.toString())
                    if ( x === 6){
                        if (board[x - 2][y].part === -1){
                            validMoves.push((x-2).toString() + y.toString())
                        }
                    }
                }

                if (y - 1 >= 0) {
                    if (board[x - 1][y - 1].side !== -1 & board[x - 1][y - 1].side !== side) {
                        validMoves.push((x - 1).toString() + (y - 1).toString())
                    }
                }
                if (y + 1 <= 7) {
                    if (board[x - 1][y + 1].side !== -1 & board[x - 1][y + 1].side !== side) {
                        validMoves.push((x - 1).toString() + (y + 1).toString())
                    }

                }
            }

            //is black pawn
            if( side === 1){
                if (board[x + 1][y].part === -1) {
                    validMoves.push((x+1).toString() + y.toString())
                    if ( x === 1){
                        if (board[x + 2][y].part === -1){
                            validMoves.push((x+2).toString() + y.toString())
                        }
                    }
                }

                if (y - 1 >= 0) {
                    if (board[x + 1][y - 1].side !== -1 & board[x + 1][y - 1].side !== side) {
                        validMoves.push((x + 1).toString() + (y - 1).toString())
                    }
                }
                if (y + 1 <= 7) {
                    if (board[x + 1][y + 1].side !== -1 & board[x + 1][y + 1].side !== side) {
                        validMoves.push((x + 1).toString() + (y + 1).toString())
                    }
                }
            }

        }
        //end pawn

        //begin rook
        if(part === 1){
            //same for both sides
            for(let i = x + 1; i <= 7; i++){
                if(board[i][y].part != -1 ){
                    if (board[i][y].side !== side ){
                        validMoves.push((i).toString() + y.toString())
                    }
                    break
                } else {
                    validMoves.push((i).toString() + y.toString())
                }
            }

            for(let i = x - 1; i >= 0; i--){
                if(board[i][y].part !== -1 ){
                    if (board[i][y].side !== side ){
                        validMoves.push((i).toString() + y.toString())
                    }
                    break
                } else {
                    validMoves.push((i).toString() + y.toString())
                }
            }

            for(let i = y - 1; i >= 0; i--){
                if(board[x][i].part !== -1 ){
                    if (board[x][i].side !== side ){
                        validMoves.push((x).toString() + i.toString())
                    }
                    break
                } else {
                    validMoves.push((x).toString() + i.toString())
                }
            }

            for(let i = y + 1; i <= 7; i++){
                if(board[x][i].part !== -1 ){
                    if (board[x][i].side !== side ){
                        validMoves.push((x).toString() + i.toString())
                    }
                    break
                } else {
                    validMoves.push((x).toString() + i.toString())
                }
            }

        }

        //knight
        if( part === 2){

            if( y - 2 >= 0){
                if (x - 1 >= 0){
                    if(board[x - 1][y - 2].side !== side){
                        validMoves.push((x - 1).toString() + (y-2).toString())
                    }
                }
                if (x + 1 <= 7){
                    if(board[x+1][y-2].side !== side){
                        validMoves.push((x + 1).toString() + (y-2).toString())

                    }
                }
            }

            if (y + 2 <= 7){
                if (x - 1 >= 0){
                    if(board[x - 1][y + 2].side !== side){
                        validMoves.push((x - 1).toString() + (y+2).toString())
                    }
                }
                if (x + 1 <= 7){
                    if(board[x+1][y+2].side !== side){
                        validMoves.push((x + 1).toString() + (y+2).toString())

                    }
                }
            }

            if (x + 2 <= 7){
                if (y - 1 >= 0){
                    if(board[x + 2][y - 1].side !== side){
                        validMoves.push((x + 2).toString() + (y - 1).toString())
                    }
                }
                if (y + 1 <= 7){

                    if(board[x + 2][y + 1].side !== side){
                        validMoves.push((x + 2).toString() + (y + 1 ).toString())

                    }
                }
            }

            if (x - 2 >= 0){
                if (y - 1 >= 0){
                    if(board[x - 2][y - 1].side !== side){
                        validMoves.push((x - 2).toString() + (y - 1).toString())
                    }
                }
                if (y + 1 <= 7){
                    if(board[x - 2][y + 1].side !== side){
                        validMoves.push((x - 2).toString() + (y + 1 ).toString())

                    }
                }
            }
            //end knight
        }

        //bishop
        if( part === 3){
            let i = x - 1
            let j = y - 1
            while( i >= 0 & j>=0){
                if(board[i][j].part !== -1 ){
                    if (board[i][j].side !== side ){
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
                if(board[i][j].part !== -1 ){
                    if (board[i][j].side !== side ){
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
                if(board[i][j].part !== -1 ){
                    if (board[i][j].side !== side ){
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
                if(board[i][j].part !== -1 ){
                    if (board[i][j].side !== side ){
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
        if(part === 4){
            for(let i = x + 1; i <= 7; i++){
                if(board[i][y].part !== -1 ){
                    if (board[i][y].side !== side ){
                        validMoves.push((i).toString() + y.toString())
                    }
                    break
                } else {
                    validMoves.push((i).toString() + y.toString())
                }
            }

            for(let i = x - 1; i >= 0; i--){
                if(board[i][y].part !== -1 ){
                    if (board[i][y].side !== side ){
                        validMoves.push((i).toString() + y.toString())
                    }
                    break
                } else {
                    validMoves.push((i).toString() + y.toString())
                }
            }

            for(let i = y - 1; i >= 0; i--){
                if(board[x][i].part !== -1 ){
                    if (board[x][i].side !== side ){
                        validMoves.push((x).toString() + i.toString())
                    }
                    break
                } else {
                    validMoves.push((x).toString() + i.toString())
                }
            }

            for(let i = y + 1; i <= 7; i++){
                if(board[x][i].part !== -1 ){
                    if (board[x][i].side !== side ){
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
                if(board[i][j].part !== -1 ){
                    if (board[i][j].side !== side ){
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
                if(board[i][j].part !== -1 ){
                    if (board[i][j].side !== side ){
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
                if(board[i][j].part !== -1 ){
                    if (board[i][j].side !== side ){
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
                if(board[i][j].part !== -1 ){
                    if (board[i][j].side !== side ){
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

        if( part === 5){
            if( x - 1 >= 0){
                if( board[x-1][y].side !== side){
                    validMoves.push((x-1).toString() + y.toString())
                }
                if( y-1 >= 0) {
                    if (board[x - 1][y - 1].side !== side) {
                        validMoves.push((x - 1).toString() + (y - 1).toString())
                    }
                }
                if(y + 1 <= 7) {
                    if (board[x - 1][y + 1].side !== side) {
                        validMoves.push((x - 1).toString() + (y + 1).toString())
                    }
                }
            }

            if(x + 1 <= 7){
                if( board[x+1][y].side !== side){
                    validMoves.push((x+1).toString() + y.toString())
                }
                if( y-1 >= 0) {
                    if (board[x + 1][y - 1].side !== side) {
                        validMoves.push((x + 1).toString() + (y - 1).toString())
                    }
                }
                if(y + 1 <= 7) {
                    if (board[x + 1][y + 1].side !== side) {
                        validMoves.push((x + 1).toString() + (y + 1).toString())
                    }
                }
            }

            if( y - 1 >= 0){
                if( board[x][y - 1].side !== side){
                    validMoves.push((x).toString() + (y - 1).toString())
                }
            }

            if( y + 1 <= 7){
                if( board[x][y + 1].side !== side){
                    validMoves.push((x).toString() + (y + 1).toString())
                }
            }

        }



        //end rook

        return validMoves
    }



    checkAllPiecesIfCheck(p1, xy1){
        let tempGameState = [...this.state.gameState]
        let side = p1.props.side

        let x1 = p1.props.x
        let y1 = p1.props.y

        let x2 = parseInt(xy1[0], 10)
        let y2 = parseInt(xy1[1], 10)

        let temp1 = tempGameState[x1][y1]
        let temp2 = tempGameState[x2][y2]
        tempGameState[x2][y2] = {x:x2,y:y2,tileColor: tempGameState[x2][y2].tileColor, part: tempGameState[x1][y1].part, side: tempGameState[x1][y1].side}
        tempGameState[x1][y1] = {x:x1,y:y1, tileColor: tempGameState[x1][y1].tileColor, part: -1, side: -1}
        //this.getValidMoves(tempGameState[i][j], i+j, true)
        console.log(x1.toString() + y1.toString())
        console.log(x2.toString() + y2.toString())


        for (let i = 0; i < 8; i++){
            for(let j = 0; j < 8 ; j++){
                //console.log(tempGameState[i][j])
                if(tempGameState[i][j].side !== side){
                    if(this.checkMoveCheck(i.toString()+j.toString(), !side, tempGameState)){
                        tempGameState[x2][y2] = temp2
                        tempGameState[x1][y1] = temp1
                        return true;
                    }
                }
            }
        }

        tempGameState[x2][y2] = temp2
        tempGameState[x1][y1] = temp1


        return false
    }

    checkMoveCheck(xy1, side, matrix){
        let x = parseInt(xy1[0], 10)
        let y = parseInt(xy1[1], 10)
        let tempGameState = matrix
        let moves = this.getValidMoves(tempGameState[x][y], xy1, tempGameState, true)

        for( let i = 0; i < moves.length; i++){
            let j = parseInt(moves[i][0], 10)
            let k = parseInt(moves[i][1], 10)

            if (tempGameState[j][k].side !== side & tempGameState[j][k].part === 5){
                return true
            }
        }

        return false
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
