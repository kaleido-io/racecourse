import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentPlayerBet, isCurrentPlayerReadyToRace } from '../race-utils.js';
import PlaceBetPrompt from './PlaceBetPrompt';
import ReadyToRacePrompt from './ReadyToRacePrompt';
import '../css/CurrentBets.css';

class CurrentBets extends Component {

    render() {
        const currentPlayerBet = getCurrentPlayerBet(this.props.account, this.props.contractState.bets);
        let playerAction;
        let message;
        if(!currentPlayerBet) {
            message = 'Place a bet to join the race';
            playerAction = <PlaceBetPrompt />;
        } else if(!isCurrentPlayerReadyToRace(this.props.account, this.props.contractState.bets)) {
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
                        {this.props.contractState.bets.map((bet) => (
                            <tr key={bet.player}>
                                <td>{bet.player}</td>
                                <td>{this.props.contractState.horses[bet.index].name}</td>
                                <td>{bet.amount}</td>
                                <td>{bet.playerReadyToRace? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="jackpot">Jackpot: {this.props.contractState.jackpot}</div>
                <div className="message">{message}</div>
                {playerAction}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account,
    contractState: state.contractState
});

export default connect(mapStateToProps)(CurrentBets);
