import React, {Component} from 'react';
import SpotifyAPI from 'spotify-web-api-js';

//Component
import ResultContainer from './ResultContainer';

//CSS
import './App.css';

const CLIENT_ID = '5581b28c8afe4810acaf7750cd3aae70';
const REDIRECT_URL = 'http://localhost:3000/callback';
const stateKey = 'spotify_auth_state';
const scope = 'user-read-private user-read-email';

const spotify = new SpotifyAPI();


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hashParams: null,
            data: {},
            query: ''
        };
    }

    componentWillMount() {
        let hashParams = {};
        let e = /([^&;=]+)=?([^&;]*)/g;
        let r = /([^&;=]+)=?([^&;]*)/g;

        const q = window
            .location
            .hash
            .substring(1) || null;

        // eslint-disable-next-line
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        this.setState({
            hashParams
        });

    }

    _generateRandomString(number) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < number; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.number));
        }

        return text;
    }

    _login(text) {

        const state = this._generateRandomString(16);

        localStorage.setItem(stateKey, state);

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(CLIENT_ID);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URL);
        url += '&state=' + encodeURIComponent(state);

        window.location = url;
    }

    _handleChange(e) {
      let query = e.target.value.trim().toLowerCase();

      if (this.state.query === query) {
        return;
      }

      this.setState({
        query
      });

      spotify.setAccessToken(this.state.hashParams.access_token);

      spotify.searchArtists(query)
        .then((result) => {
          this.setState({
            data: result
          });
        }).catch((err) => {
          console.log(err);
        });
    }

    render() {

        if (window.location.hash) {
            return (
                <div className="App">
                  <input onChange={this._handleChange.bind(this)}/>
                  <ResultContainer data={this.state.data} />
                </div>
            );
        } else {
            return (
                <div className="App">
                    <button
                        onClick={this
                        ._login
                        .bind(this)}>Hello</button>
                </div>
            );
        }
    }
}

export default App;



