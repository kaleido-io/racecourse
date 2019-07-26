import React, { useState } from 'react';
import { connect } from 'react-redux';
import muteIcon from '../../img/mute.png';
import unmuteIcon from '../../img/unmute.png';
import './SoundControl.css';

const SoundControl = ({ currentSound, sounds, dispatch }) => {

    const [soundOn, updateSoundOn] = useState(sounds);

    const handleSoundChange = (event) => {
        updateSoundOn(event.target.checked);
        dispatch({ type: 'SET_SOUNDS', payload: { sounds: event.target.checked } });
        if(currentSound) {
            currentSound.muted = !event.target.checked;
        }
    }

    return (
        <div className="sound-control-container">
            <label>
                <input className="sounds-checkbox"
                name="sounds"
                type="checkbox"
                checked={ soundOn }
                onChange={ handleSoundChange } />
                <img className="sound-control-icon" src={ soundOn ? unmuteIcon : muteIcon } alt="Sound" />
            </label>
        </div>
    );
};

const mapStateToProps = state => ({
    sounds: state.sounds,
    currentSound: state.currentSound
});

export default connect(mapStateToProps)(SoundControl);
