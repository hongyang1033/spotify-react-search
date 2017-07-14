import React, { Component } from 'react';

//util
import Util from './util';

export default class ResultContainer extends Component {
  render() {

    if (Object.keys(this.props.data).length === 0) {
      return <p>Search for an artist</p>;
    }

    const artists = Util.getArtists(this.props.data.artists);

    return (
      <div className="container">
        <div className="row">
          {artists}
        </div>
      </div>
    );
  }
}
