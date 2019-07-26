import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Track from './components/Track';
import MainScreen from './components/MainScreen';
import SoundControl from './components/SoundControl';
import ConnectToNode from './components/ConnectToNode';
import loading from './img/loading.gif';
import AccountSelector from './components/AccountSelector';
import PropTypes from 'prop-types';

const App = ({ dispatch, sessionData }) => {

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    }
    
    if(sessionData) {
        if(sessionData.accounts) {
            return (
                <>
                <Track />
                <div className="app">
                    <div className="top-bar">
                        <div className="app-main-title">Racecourse</div>
                        <div className="right-aligned-container">
                        <div className="contract-address-label">Contract address:</div>
                        <input type="text" className="contract-value" readOnly value={sessionData.contractAddress} />
                            <div className="account">Your account:</div>
                            <AccountSelector />
                            <button className="logout-button" onClick={logout}>Log out</button>
                            <SoundControl />
                        </div>
                    </div>
                    <div className="main-screen-container">
                        <MainScreen />
                    </div>
                </div>
                </>
            );
        } else {
            return (
                <>
                <Track />
                <div className="app">
                    <ConnectToNode />
                </div>
                </>
            );
        }
    } else {
        return (
            <>
            <Track />
            <div className="loading">
                <img src={loading} alt="Loading" />
            </div>
            </>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func,
    sessionData: PropTypes.shape
}

const mapStateToProps = state => ({
    sessionData: state.sessionData,
    account: state.account
});

export default connect(mapStateToProps)(App);
