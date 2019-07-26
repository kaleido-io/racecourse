import React from 'react';
import { connect } from 'react-redux';
import { getCurrentPlayerBet, isCurrentPlayerReadyToRace } from '../../race-utils.js';
import PlaceBetPrompt from '../PlaceBet';
import ReadyToRacePrompt from '../ReadyToRace';
import './CurrentBets.css';
import PropTypes from 'prop-types';

const CurrentBets = ({ account, contractState }) => {

    const currentPlayerBet = getCurrentPlayerBet(account, contractState.bets);
    let playerAction;
    let message;

    if(!currentPlayerBet) {
        message = 'Place a bet to join the race';
        playerAction = <PlaceBetPrompt />;
    } else if(!isCurrentPlayerReadyToRace(account, contractState.bets)) {
        message = 'The race will start when all players are ready'
        playerAction = <ReadyToRacePrompt />;
    } else {
        message = 'The race will start when all other players are ready'
    }

    return (
        <div className="current-bets-container">
            <div className="title">Current Bets</div>
            <table className="current-bets-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Horse</th>
                        <th>Bet</th>
                        <th>Ready to race</th>
                    </tr>
                </thead>
                <tbody>
                    {contractState.bets.map((bet) => (
                        <tr key={bet.player}>
                            <td>{bet.player}</td>
                            <td>{contractState.horses[bet.index].name}</td>
                            <td>{bet.amount}</td>
                            <td>{bet.playerReadyToRace? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="jackpot">Jackpot: {contractState.jackpot}</div>
            <div className="message">{message}</div>
            {playerAction}
        </div>
    )
}

CurrentBets.propTypes = {
    account: PropTypes.string,
    contractState: PropTypes.shape
}

const mapStateToProps = state => ({
    account: state.account,
    contractState: state.contractState
});

export default connect(mapStateToProps)(CurrentBets);
