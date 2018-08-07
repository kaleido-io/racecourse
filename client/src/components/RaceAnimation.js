import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/RaceAnimation.css';
import $ from 'jquery';
import raceStartSound from '../sounds/race-start.mp3';
import horse1 from '../img/horse-1.png';
import horse2 from '../img/horse-2.png';
import horse3 from '../img/horse-3.png';
import horse4 from '../img/horse-4.png';
import horse5 from '../img/horse-5.png';

class RaceAnimation extends Component {

    componentDidMount() {
        this.animateRace(Number(this.props.winnerHorse));
    }

    animateRace(winnerHorse) {

        let audio = new Audio(raceStartSound);
        audio.play();
        audio.muted = !this.props.sounds;
        this.props.dispatch({ type: 'PLAY_SOUND', payload: {sound: audio}});

        $('.lane').removeClass('winner-lane');
        $('.horse').removeAttr('style');

        window.setTimeout(() => {
            $('.lane').removeClass('winner-lane');
            $('.horse').addClass('horse-racing');
            let winnerHorseTime = 5700;
            for (let i = 0; i < 5; i++) {
                let speed = winnerHorseTime;
                if (i !== winnerHorse) {
                    speed += 1000 * (Math.floor(Math.random() * 3) + 2);
                }
                $('.horse-' + (i + 1)).animate({
                    left: '100%'
                }, speed).promise().done((horse) => {
                    horse.removeClass('horse-racing');
                });
            }
            window.setTimeout(() => {
                $('.lane-' + (winnerHorse + 1)).addClass('winner-lane');
            }, winnerHorseTime);

            window.setTimeout(() => {
                $('.track').fadeOut(750, () => {
                    this.props.dispatch({ type: 'RACE_ANIMATION_ENDED' });
                });
            }, 10000);

        }, 3000);
    }

    render() {
        return (
            <div className="race-animation-container">
                <div className="track">
                    <div className="lane-container">
                        <div className="lane lane-1">{this.props.contractState.horses[0].name}</div>
                        <div className="lane lane-2">{this.props.contractState.horses[1].name}</div>
                        <div className="lane lane-3">{this.props.contractState.horses[2].name}</div>
                        <div className="lane lane-4">{this.props.contractState.horses[3].name}</div>
                        <div className="lane lane-5">{this.props.contractState.horses[4].name}</div>
                    </div>
                    <div className="horses-container">
                        <img src={horse1} className="horse horse-1" alt="Horse 1" />
                        <img src={horse2} className="horse horse-2" alt="Horse 2" />
                        <img src={horse3} className="horse horse-3" alt="Horse 3" />
                        <img src={horse4} className="horse horse-4" alt="Horse 4" />
                        <img src={horse5} className="horse horse-5" alt="Horse 5" />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contractState: state.contractState,
    sounds: state.sounds
});

export default connect(mapStateToProps)(RaceAnimation);
