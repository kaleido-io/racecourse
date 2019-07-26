import React from 'react';
import { connect } from 'react-redux';
import RaceResult from '../RaceResult';
import CurrentBets from '../CurrentBets';
import RaceAnimation from '../RaceAnimation';
import './MainScreen.css';
import loading from '../../img/loading.gif';
import PropTypes from 'prop-types';

const MainScreen = ({ contractState, lastEvent }) => {

    let component;

    if(!contractState) {
        return (
            <div className="loading">
                <img src={loading} alt="Loading" />
            </div>
        );
    } else if (contractState.raceFinished) {
        if(lastEvent !== 'Initialization' && lastEvent !== 'Race animation ended') {
            component = <RaceAnimation winnerHorse={contractState.winnerHorse} />
        } else {
            component = <RaceResult />
        }
    } else {
        component = <CurrentBets />
    }

    return (
        <div className="main-screen-contents">
            {component}
        </div>
    );
}

MainScreen.propTypes = {
    contractState: PropTypes.shape,
    lastEvent: PropTypes.func
}

const mapStateToProps = state => ({
    contractState: state.contractState,
    lastEvent: state.lastEvent
});

export default connect(mapStateToProps)(MainScreen);
