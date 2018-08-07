import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/ReadyToRacePrompt.css';
import readyToRaceSound from '../sounds/ready-to-race.mp3';

class ReadyToRacePrompt extends Component {

    constructor(props) {
        super(props);
        this.state = {readyToRaceSet: false};
    }

    playerReadyToRace = () => {
        this.props.dispatch({ type: 'PLAYER_READY_TO_RACE', payload: { account: this.props.account} });

        let audio = new Audio(readyToRaceSound);
        audio.play();
        audio.muted = !this.props.sounds;
        this.props.dispatch({ type: 'PLAY_SOUND', payload: {sound: audio}});

        this.setState({readyToRaceSet: true});
    };

    render() {
        return (
            <div className="ready-to-race-prompt-container">
                <div className="ready-to-race-controls">
                    <div className="ready-to-race-message">Are you ready to race?</div>
                    <button className={'ready-to-race-button ' + (this.state.readyToRaceSet? 'disabled' : '')} onClick={this.playerReadyToRace}>Yes, I'm ready</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account,
    sounds: state.sounds
});

export default connect(mapStateToProps)(ReadyToRacePrompt);
