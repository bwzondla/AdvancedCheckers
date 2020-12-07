import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import piecesubstutute from './assets/piecesubstitute.png';
import whitepawn from './assets/pawnsprite.png';
import whiterook from './assets/rooksprite.png';
import whitebishop from './assets/bishopsprite.png';
import whiteknight from './assets/knightsprite.png';
import whitequeen from './assets/queensprite.png';
import whiteking from './assets/kingsprite.png';
import blackpawn from './assets/blackpawnsprite.png';
import blackrook from './assets/blackrooksprite.png';
import blackbishop from './assets/blackbishopsprite.png';
import blackknight from './assets/blackknightsprite.png';
import blackqueen from './assets/blackqueensprite.png';
import blackking from './assets/blackkingsprite.png';

class ChessPiece extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            bgColor: "#555555"
        }
    }

    clicked = (e) => {
        this.setState({
            bgColor: "#F5F542"
        })
    }

    render()
    {
        if(this.props.part === -1){
            return(
                <div className={"img"}></div>
            )
        }
        if(this.props.side === 0)
        {
            if (this.props.part === 0)
            {

                return (
                    <img className={"img"} src={whitepawn} />
                );
            }
            else if(this.props.part === 1)
            {
                return (
                    <img className={"img"} src={whiterook} />
                );
            }
            else if(this.props.part === 2)
            {
                //whiteknight lol
                return (
                    <img className={"img"} src={whiteknight} />
                );
            }
            else if(this.props.part === 3)
            {
                return (
                    <img className={"img"} src={whitebishop} />
                );
            }
            else if(this.props.part === 4)
            {
                return (
                    <img className={"img"} src={whitequeen} />
                );
            }
            else if(this.props.part === 5)
            {
                return (
                    <img className={"img"} src={whiteking} />
                );
            }
        }
        else if(this.props.side === 1)
        {
            if (this.props.part === 0)
            {
                return (
                    <img className={"img"} src={blackpawn} />
                );
            }
            else if(this.props.part === 1)
            {
                return (
                    <img className={"img"} src={blackrook} />
                );
            }
            else if(this.props.part === 2)
            {
                return (
                    <img className={"img"} src={blackknight} />
                );
            }
            else if(this.props.part === 3)
            {
                return (
                    <img className={"img"} src={blackbishop} />
                );
            }
            else if(this.props.part === 4)
            {
                return (
                    <img className={"img"} src={blackqueen} />
                );
            }
            else if(this.props.part === 5)
            {
                return (
                    <img className={"img"} src={blackking} />
                );
            }
        }

        return (
            <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                <img src={piecesubstutute} />
            </button>
        );

    }
}

class Piece extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            clicks: 0
        }
    }

    renderPiece(i, j)
    {
        return <ChessPiece part = {i} side = {j}/>;
    }

    clicked = (e) => {
        let c = this.state.clicks
        this.setState({
            clicks: c + 1
        })
    }

    render()
    {
        return (
            <div className="selection" onClick={this.clicked}>
                <div className="r1">
                    {this.renderPiece(0, 0)}
                    {this.renderPiece(0, 0)}
                    {this.renderPiece(0, 0)}
                    {this.renderPiece(0, 0)}
                    {this.renderPiece(0, 0)}
                    {this.renderPiece(0, 0)}
                    {this.renderPiece(0, 0)}
                    {this.renderPiece(0, 0)}
                </div>
                <div className="r2">
                    {this.renderPiece(1, 0)}
                    {this.renderPiece(2, 0)}
                    {this.renderPiece(3, 0)}
                    {this.renderPiece(4, 0)}
                    {this.renderPiece(5, 0)}
                    {this.renderPiece(3, 0)}
                    {this.renderPiece(2, 0)}
                    {this.renderPiece(1, 0)}
                </div>
                <div className="r3">
                    {this.renderPiece(0, 1)}
                    {this.renderPiece(0, 1)}
                    {this.renderPiece(0, 1)}
                    {this.renderPiece(0, 1)}
                    {this.renderPiece(0, 1)}
                    {this.renderPiece(0, 1)}
                    {this.renderPiece(0, 1)}
                    {this.renderPiece(0, 1)}
                </div>
                <div className="r4">
                    {this.renderPiece(1, 1)}
                    {this.renderPiece(2, 1)}
                    {this.renderPiece(3, 1)}
                    {this.renderPiece(4, 1)}
                    {this.renderPiece(5, 1)}
                    {this.renderPiece(3, 1)}
                    {this.renderPiece(2, 1)}
                    {this.renderPiece(1, 1)}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Piece />,
    document.getElementById('root')
);

ReactDOM.render(
    <ChessPiece />,
    document.getElementById('root')
);
export default ChessPiece;
