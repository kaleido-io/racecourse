import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './RaceAnimation.css';
import raceStartSound from '../../sounds/race-start.mp3';
import horse1 from '../../img/horse-1.png';
import horse2 from '../../img/horse-2.png';
import horse3 from '../../img/horse-3.png';
import horse4 from '../../img/horse-4.png';
import horse5 from '../../img/horse-5.png';
import PropTypes from 'prop-types';

const WAITING = 'waiting';
const RUNNING = 'running';
const FINISHED = 'finished';
const SPEED_OF_WINNER = 5700;
const horseImages = [
    horse1,
    horse2,
    horse3,
    horse4,
    horse5
];

class RaceAnimation extends Component {

    constructor(props) {
        super(props);
        
        let horseArray = [];

        horseImages.map((image, index) => {
            horseArray[index] = {
                status: WAITING,
                speed: SPEED_OF_WINNER,
                image
            };
        });

        this.state = {
            animation: WAITING,
            horses: horseArray
        }

        this.animateRace = this.animateRace.bind(this);
    }

    componentWillMount() {
        console.log('component will mount');
        this.animateRace(parseInt(this.props.winnerHorse));
    }

    animateRace(winnerHorse) {
        const audio = new Audio(raceStartSound);
        audio.play();
        audio.muted = !this.props.sounds;
        this.props.dispatch({ type: 'PLAY_SOUND', payload: {sound: audio}});

        window.setTimeout(() => {
            this.setState((prevState) => ({
                ...prevState,
                animation: RUNNING
            }))
            
            for (let i = 0; i < 5; i++) {
                
                if (i !== winnerHorse) {
                    let newState = this.state.horses;
                    let winnerSpeed = SPEED_OF_WINNER;
                    newState[i] = {
                        ...newState[i],
                        speed: winnerSpeed += 1000 * (Math.floor(Math.random() * 3) + 2)
                    };
                    this.setState((prevState) => ({ 
                        ...prevState,
                        horses: newState
                    }))
                }

                let newState = this.state.horses;
                newState[i] = {
                    ...newState[i],
                    status: RUNNING
                };
                this.setState((prevState) => ({
                    ...prevState,
                    horses: newState
                }))
                for (let i = 0; i < 5; i++) {

                    window.setTimeout(() => {
                        let newState = this.state.horses;
                        newState[i] = {
                            ...newState[i],
                            status: FINISHED
                        };
                        this.setState((prevState) => ({
                            ...prevState,
                            horses: newState
                        }));
                    }, this.state.horses[i].speed);
  
                } 
            }

            window.setTimeout(() => {
                this.props.dispatch({ type: 'RACE_ANIMATION_ENDED' });
            }, 10000);

        }, 3000);
    }

    render() {
        return (
            <div className="race-animation-container">
                <div className="track">
                    <div className="lane-container">
                        { this.state.horses && this.state.horses.map((horse, i) => (
                            <div className={`lane lane-${i} ${ this.state.animation === FINISHED && this.props.winnerHorse === i && 'winner-lane'}`}>
                                {this.props.contractState.horses[i].name}
                            </div>
                        ))}
                    </div>
                    <div className="horses-container">
                        { this.state.horses && this.state.horses.map((horse, i) => (
                            <img src={horse.image} 
                                className={`horse horse-${i} horse-${horse.status}`} 
                                alt={`Horse ${i}`} 
                                style={ horse.status === RUNNING  ? {
                                    animation: `race ${(horse.speed/1000)} s linear`
                                }: {} } />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

RaceAnimation.propTypes = {
    contractState: PropTypes.shapeOf({
        horses: PropTypes.array
    })
}

const mapStateToProps = state => ({
    contractState: state.contractState,
    sounds: state.sounds
});

export default connect(mapStateToProps)(RaceAnimation);
