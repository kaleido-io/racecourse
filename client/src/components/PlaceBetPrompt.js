import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/PlaceBetPrompt.css';
import betSound from '../sounds/bet.mp3';

class PlaceBet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            betAmount: 10,
            selectedHorse: 0,
            betPlaced: false,
            horseSelected: false
        };

        this.handleBetAmountChange = this.handleBetAmountChange.bind(this);
        this.handleSelectedHorseChange = this.handleSelectedHorseChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBetAmountChange(event) {
        this.setState({betAmount: event.target.value});
    }

    handleSelectedHorseChange(event) {
        this.setState({
            selectedHorse: event.target.value,
            horseSelected: true
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch({ type: 'PLACE_BET', payload: { index: this.state.selectedHorse,
            amount: this.state.betAmount, account: this.props.account} });

        let audio = new Audio(betSound);
        audio.play();
        audio.muted = !this.props.sounds;
        this.props.dispatch({ type: 'PLAY_SOUND', payload: {sound: audio}});

        this.setState({betPlaced: true});
    }

    render() {
        return (
            <div className="place-bet-container">
                <form className="place-bet-form" onSubmit={this.handleSubmit}>
                    <div className="horse-radios-container">
                        {this.props.contractState.horses.map((horse) => (
                            <label className="horse-radio-container" key={horse.index}>
                                <img src={require('../img/horse-' + (Number(horse.index) + 1) + '.png')} className="horse-radio-image" alt="horse" />
                                {horse.name}
                                <input className="horse-radio-input" type="radio" name="horse" value={horse.index} key={horse.index}
                                onChange={this.handleSelectedHorseChange} />
                            </label>
                        ))}
                    </div>
                    <label className="form-label">Amount:</label>
                    <input type="number" className="bet-amount-input" value={this.state.betAmount} onChange={this.handleBetAmountChange} />
                    <button type="submit" className={'place-bet-button ' + (this.state.betPlaced || !this.state.horseSelected? 'disabled' : '')}>Place bet</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contractState: state.contractState,
    account: state.account,
    sounds: state.sounds
});

export default connect(mapStateToProps)(PlaceBet);
