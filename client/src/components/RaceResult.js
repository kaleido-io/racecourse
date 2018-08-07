import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlaceBetPrompt from './PlaceBetPrompt';
import { getWinners } from '../race-utils';
import '../css/RaceResults.css';
import horse1 from '../img/horse-1.png';
import horse2 from '../img/horse-2.png';
import horse3 from '../img/horse-3.png';
import horse4 from '../img/horse-4.png';
import horse5 from '../img/horse-5.png';

class RaceResult extends Component {

    render() {
        let winners = getWinners(this.props.contractState.winnerHorse, this.props.contractState.bets);
        let award;
        let message;
        let jackpotValue;
        if(winners.length > 0) {
            award = this.props.contractState.jackpot / winners.length;
            if(winners.indexOf(this.props.account) !== -1) {
                message = `Congratulations! you won ${award}`;
            }
            jackpotValue = 'Jackpot: ' + this.props.contractState.jackpot;
        } else {
            message = `jackpot grows to: ${this.props.contractState.jackpot}`;
        }
        
        let winnerHorseImage;
        switch(this.props.contractState.winnerHorse) {
            case '0': winnerHorseImage = horse1; break;
            case '1': winnerHorseImage = horse2; break;
            case '2': winnerHorseImage = horse3; break;
            case '3': winnerHorseImage = horse4; break;
            case '4': winnerHorseImage = horse5; break;
            default: break;
        }

        return (
            <div className="race-results-container">
                <div className="title">Race Results</div>
                <img className="winner-horse-image" src={winnerHorseImage} alt="Winner horse" />
                <div className="winner-horse-name">Winner: {this.props.contractState.horses[this.props.contractState.winnerHorse].name}</div>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Horse</th>
                            <th>Bet</th>
                            <th>Award</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.contractState.bets.map((bet) => (
                            <tr key={bet.player}>
                                <td>{bet.player}</td>
                                <td>{this.props.contractState.horses[bet.index].name}</td>
                                <td>{bet.amount}</td>
                                <td>{winners.indexOf(bet.player) !== -1 ? award : 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="jackpot-value">{jackpotValue}</div>
                <div className="results-message">{message}</div>
                <div className="place-new-bet-message">Place a bet to start a new race</div>
                <PlaceBetPrompt />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account,
    contractState: state.contractState
});

export default connect(mapStateToProps)(RaceResult);
