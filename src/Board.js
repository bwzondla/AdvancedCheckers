import React from 'react';
import './Board.css';

class Tile extends React.Component{

    constructor(props) {
        super(props);
    }

    render()
    {
        return (
            <div
                className={this.props.tileColor == "#000000" ? 'black-tile' : 'white-tile'}
                onClick={this.props.onClick}
                background-color={this.props.tileColor}>
                {this.props.x}
            </div>

        );
    }
}

class Board extends React.Component {


    render(){
        return (
            <div>
                {this.renderBoard(this.createEmptyBoard())}
            </div>
        )
    }

    createEmptyBoard(){
        let matrix = [];
        for (let i = 0; i < 8; i++){
            matrix.push([]);
            for (let j = 0; j < 8; j++){
                let color = "#FFFFFF";
                if ((i & 1) === 0 && (j & 1) === 1){
                    color = "#000000";
                } else if ((i & 1) === 1 && (j & 1) === 0){
                    color = "#000000";
                }

                matrix[i][j] = {
                    x:i,
                    y:j,
                    tileColor:color
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
                            //onClick = { () => this.handleTileClick(item.x,item.y)}
                            value = {item}
                            x = {item.x}
                            y = {item.y}
                            tileColor = {item.tileColor}
                        />
                        {(row[row.length - 1] === item) ? <div className="clear"/> : ""}
                    </div>);
            })
        });
    }
}

export default Board;
