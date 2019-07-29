import React, { useState } from 'react';
import { connect } from 'react-redux';
import './PlaceBet.css';
import betSound from '../../sounds/bet.mp3';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-dropdown';

const PlaceBet = ({ account, contractState, dispatch, sounds }) => {

    const [selectedHorse, updateSelectedHorse] = useState(null);
    const [betAmount, updateBetAmount] = useState(0);
    const [betWasPlaced, updateBetWasPlaced] = useState(false);

    const handleBetAmountChange = (event) => {
        updateBetAmount(event.target.value);
    }

    const handleSelectedHorseChange = (event) => {
        updateSelectedHorse(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'PLACE_BET', payload: { 
            index: selectedHorse,
            amount: betAmount, account
        }});

        let audio = new Audio(betSound);
        audio.play();
        audio.muted = !sounds;
        dispatch({ type: 'PLAY_SOUND', payload: {sound: audio}});
        
        updateBetWasPlaced(true);
    }

    const generateOptions = (horses) => {
        let optionArr = [];
        horses.map((horse, index) => optionArr.push({
            value: horse.name,
            label: <div>{ horse.name }</div>
        });

        return optionArr;
    }

    return (
        <div className="place-bet-container">
            <Dropdown options={contractState.horses} onChange={handleSelectedHorseChange} placeholder="Select a horse" />
                <label className="form-label">Amount:</label>
                <input type="number" className="bet-amount-input" value={betAmount} onChange={handleBetAmountChange} />
                <button type="submit" className={'place-bet-button ' + (betWasPlaced || !selectedHorse ? 'disabled' : '')} onClick={handleSubmit}>Place bet</button>
        </div>
    );
};

PlaceBet.propTypes = {
    account: PropTypes.string,
    constractState: PropTypes.shapeOf(),
    dispatch: PropTypes.func,
    sounds: PropTypes.bool
}

const mapStateToProps = state => ({
    contractState: state.contractState,
    account: state.account,
    sounds: state.sounds
});

export default connect(mapStateToProps)(PlaceBet);
