import React, { Component } from 'react';
import { connect } from 'react-redux';
import muteIcon from '../img/mute.png';
import unmuteIcon from '../img/unmute.png';
import '../css/SoundControl.css';

class SoundControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sounds: this.props.sounds
        };
        this.handleSoundChange = this.handleSoundChange.bind(this);
    }

    handleSoundChange(event) {
        this.setState({sounds: event.target.checked});
        this.props.dispatch({ type: 'SET_SOUNDS', payload: { sounds: event.target.checked } });
        let currentSound = this.props.currentSound;
        if(currentSound) {
            currentSound.muted = !event.target.checked;
        }
    }

    render() {
        return (
            <div className="sound-control-container">
                <label>
                    <input className="sounds-checkbox"
                    name="sounds"
                    type="checkbox"
                    checked={this.state.sounds}
                    onChange={this.handleSoundChange} />
                    <img className="sound-control-icon" src={this.state.sounds? unmuteIcon : muteIcon} alt="Sound" />
                </label>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sounds: state.sounds,
    currentSound: state.currentSound
});

export default connect(mapStateToProps)(SoundControl);
