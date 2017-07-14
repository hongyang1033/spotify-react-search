import React, { Component } from 'react';

export default class Artist extends Component {
  render () {

    return (
      <div className="col-md-4">
        <img className="result-img" src={this.props.image} alt={this.props.name} height="300px" width="300px"/>
        <p>{this.props.name}</p>
      </div>
    );
  }
}
