import React, { useState } from 'react';
import { connect } from 'react-redux';
import './ConnectToNode.css';
import splashImage from '../../img/splash.png';
import PropTypes from 'prop-types';

const ConnectToNode = ({ attemptingToConnect, dispatch, sessionData }) => {

    const [url, updateUrl] = useState('');
    const [user, updateUser] = useState('');
    const [password, updatePassword] = useState('');
    const [contractAddress, updateContractAddress] = useState('');

    const handleUrlChange             = (event) => updateUrl(event.target.value);
    const handleUserChange            = (event) => updateUser(event.target.value);
    const handlePasswordChange        = (event) => updatePassword(event.target.value);
    const handleContractAddressChange = (event) => updateContractAddress(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ 
            type: 'LOGIN', 
            payload: { 
                url,
                user,
                contractAddress,
                password
            } 
        });
    }

    return (
        <div className="connection-container">
            <form className="connection-form" onSubmit={handleSubmit}>
                <div className="app-title">Racecourse</div>
                <img className="splash-image" src={splashImage} alt="Racecourse"/>

                {sessionData.loginFailed &&
                    <div className="connection-error">The connection could not be established. Please check the credentials and ensure that the environment is live.</div>
                }

                <label>Node connection URL</label>
                <input type="text" className="connect-url-input" value={url} onChange={handleUrlChange} />

                <label>User name</label>
                <input type="text" className="connect-username-input" value={user} onChange={handleUserChange} />

                <label>Password</label>
                <input type="password" className="connect-password-input" value={password} onChange={handlePasswordChange} />

                <label>Contract address <span className="optional-label">(optional)</span></label>
                <input type="text" className="connect-contract-address-input" value={contractAddress} onChange={handleContractAddressChange} />

                <button type="submit" className={'connect-button ' + (attemptingToConnect || url === '' ? 'disabled' : '')}>
                    {attemptingToConnect ? 'Connecting...' : 'Connect'}
                </button>
            </form>
        </div>
    )
}

ConnectToNode.propTypes = {
    attemptingToConnect: PropTypes.bool,
    dispatch: PropTypes.func,
    sessionData: PropTypes.shape
}

const mapStateToProps = state => ({
    sessionData: state.sessionData,
    attemptingToConnect: state.attemptingToConnect
});

export default connect(mapStateToProps)(ConnectToNode);
