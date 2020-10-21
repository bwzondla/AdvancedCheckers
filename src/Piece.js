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
        if(this.props.side === 0)
        {
            if (this.props.part === 0)
            {
                
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={whitepawn} />
                </button>
                );
            }
            else if(this.props.part === 1)
            {
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={whiterook} />
                </button>
                );
            }
            else if(this.props.part === 2)
            {
                //whiteknight lol
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={whiteknight} />
                </button>
                );
            }
            else if(this.props.part === 3)
            {
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={whitebishop} />
                </button>
                );
            }
            else if(this.props.part === 4)
            {
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={whitequeen} />
                </button>
                );
            }
            else if(this.props.part === 5)
            {
                return (
                    <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={whiteking} />
                    </button>
                );
            }
        }
        else if(this.props.side === 1)
        {
            if (this.props.part === 0)
            {
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={blackpawn} />
                </button>
                );
            }
            else if(this.props.part === 1)
            {
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={blackrook} />
                </button>
                );
            }
            else if(this.props.part === 2)
            {
                //whiteknight lol
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={blackknight} />
                </button>
                );
            }
            else if(this.props.part === 3)
            {
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={blackbishop} />
                </button>
                );
            }
            else if(this.props.part === 4)
            {
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={blackqueen} />
                </button>
                );
            }
            else if(this.props.part === 5)
            {
                return (
                <button className="square" style={{background: this.state.bgColor}} onClick={this.clicked}>
                    <img src={blackking} />
                </button>
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

export default Piece;
