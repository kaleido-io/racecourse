import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Connection.css';
import splashImage from '../img/splash.png';

class Connection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: this.props.sessionData.url || '',
            user: this.props.sessionData.user || '',
            password: this.props.sessionData.password || '',
            contractAddress: this.props.contractAddress || ''
        };

        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleContractAddressChange = this.handleContractAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUrlChange(event) {
        this.setState({url: event.target.value});
    }

    handleUserChange(event) {
        this.setState({user: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleContractAddressChange(event) {
        this.setState({contractAddress: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch({ type: 'LOGIN', payload: { url: this.state.url, user: this.state.user, contractAddress: this.state.contractAddress, password: this.state.password} });
    }

    render() {
        return (
        <div className="connection-container">
            <form className="connection-form" onSubmit={this.handleSubmit}>
                <div className="app-title">Racecource</div>
                <img className="splash-image" src={splashImage} alt="Racecourse"/>

                {this.props.sessionData.loginFailed &&
                    <div className="connection-error">The connection could not be established. Please check the credentials and ensure that the environment is live.</div>
                }

                <label>Node connection URL</label>
                <input type="text" className="connect-url-input" value={this.state.url} onChange={this.handleUrlChange} />

                <label>User name</label>
                <input type="text" className="connect-username-input" value={this.state.user} onChange={this.handleUserChange} />

                <label>Password</label>
                <input type="password" className="connect-password-input" value={this.state.password} onChange={this.handlePasswordChange} />

                <label>Contract address <span className="optional-label">(optional)</span></label>
                <input type="text" className="connect-contract-address-input" value={this.state.contractAddress} onChange={this.handleContractAddressChange} />

                <button type="submit" className={'connect-button ' + (this.props.attemptingToConnect || this.state.url === '' ? 'disabled' : '')}>
                    {this.props.attemptingToConnect? 'Connecting...' : 'Connect'}
                </button>
            </form>
        </div>);
    }
}

const mapStateToProps = state => ({
    sounds: state.sounds,
    sessionData: state.sessionData,
    attemptingToConnect: state.attemptingToConnect
});

export default connect(mapStateToProps)(Connection);
