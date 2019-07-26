import React, { useState } from 'react';
import { connect } from 'react-redux';
import './ReadyToRace.css';
import readyToRaceSound from '../../sounds/ready-to-race.mp3';

const ReadyToRacePrompt = ({ account, dispatch, sounds }) => {
    const [ readyToRace, updateReadyToRace ] = useState(false);

    const playerReadyToRace = () => {
        dispatch({ type: 'PLAYER_READY_TO_RACE', payload: { account: account} });

        let audio = new Audio(readyToRaceSound);
        audio.play();
        audio.muted = !sounds;
        dispatch({ type: 'PLAY_SOUND', payload: { sound: audio }});
        
        updateReadyToRace(true);
    }

    return (
        <div className="ready-to-race-prompt-container">
            <div className="ready-to-race-controls">
                <div className="ready-to-race-message">Are you ready to race?</div>
                <button className={'ready-to-race-button ' + (readyToRace ? 'disabled' : '')} onClick={playerReadyToRace}>Yes, I'm ready</button>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    account: state.account,
    sounds: state.sounds
});

export default connect(mapStateToProps)(ReadyToRacePrompt);
