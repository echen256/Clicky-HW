import React, { Component } from 'react';


export function List(children) {
    return (
        <div className="list-overflow-container">
            <ul className="list-group">{children}</ul>
        </div>

    );
}

export class Loading extends React.Component {
    render() {
        return <div>{this.props.loading  ? "Loading..." : ""}</div>
    }
}

export class Fraction extends React.Component {
    render() {
        return <div>
            {this.props.numerator}/ {this.props.denom}

        </div>
    }
}

export class ScoreBoard extends React.Component {
    render() {
        return <div>
            <a> Score : <b >{this.props.score}</b></a>
            <a> HighScore: <b >{this.props.highscore}</b></a>

        </div>
    }
}

export class Image extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handler(this.props.src);
        //{this.props.handler}
    }

    render() {
        return <img onClick={this.handleClick} className="dogeImage" src={this.props.src} alt={"ERROR"}></img>
    }
}

