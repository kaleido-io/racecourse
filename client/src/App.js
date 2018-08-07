import React, { Component } from 'react';
import './css/App.css';
import { connect } from 'react-redux';
import MainScreen from './components/MainScreen';
import SoundControl from './components/SoundControl';
import Connection from './components/Connection';
import loading from './img/loading.gif';
import AccountSelector from './components/AccountSelector';

class App extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.dispatch({ type: 'LOGOUT' });
    }

    render() {
        if(this.props.sessionData) {
            if(this.props.sessionData.accounts) {
                return (
                    <div className="app">
                        <div className="top-bar">
                            <div className="app-main-title">Racecourse</div>
                            <div className="right-aligned-container">
                                <div className="account">Your account:</div>
                                <AccountSelector />
                                <button className="logout-button" onClick={this.logout}>Log out</button>
                                <SoundControl />
                            </div>
                        </div>
                        <div className="main-screen-container">
                            <MainScreen />
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="app">
                        <Connection />
                    </div>
                );
            }
        } else {
            return (
                <div className="loading">
                    <img src={loading} alt="Loading" />
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    initialized: state.initialized,
    sessionData: state.sessionData,
    account: state.account,
    contractState: state.contractState
});

export default connect(mapStateToProps)(App);
