import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './AccountSelector.css';
import PropTypes from 'prop-types';

const AccountSelector = ({ dispatch, sessionData }) => {

    const [currentAccount, updateCurrentAccount] = useState(sessionData.accounts[0]);

    const dispatchAccount = (account) => {
        dispatch({ type: 'SELECT_ACCOUNT', payload: { account }});
    }

    const handleSelectedAccountChange = (event) => {
        updateCurrentAccount(event.target.value);
        dispatchAccount(event.target.value);
    }

    useEffect(() => {
        dispatchAccount(currentAccount);
    }, []);

    return (
        <div className="account-selector-container">
            <select className="account-selector" value={currentAccount} onChange={handleSelectedAccountChange}>
                {sessionData.accounts.map((account) => (
                    <option key={account} value={account}>{account}</option>
                ))}
            </select>
        </div>
    )
}

AccountSelector.propTypes = {
    sessionData: PropTypes.shape,
    dispatch: PropTypes.func
}

const mapStateToProps = state => ({
    sessionData: state.sessionData
});

export default connect(mapStateToProps)(AccountSelector);
