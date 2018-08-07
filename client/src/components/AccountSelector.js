import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/AccountSelector.css';

class AccountSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: this.props.sessionData.accounts[0]
        };
        this.dispatchAction(this.state.account);
        this.handleSelectedAccountChange = this.handleSelectedAccountChange.bind(this);
    }

    handleSelectedAccountChange(event) {
        this.setState({account: event.target.value});
        this.dispatchAction(event.target.value);
    }

    dispatchAction(account) {
        this.props.dispatch({ type: 'SELECT_ACCOUNT', payload: { account }});
    }

    render() {
        return (
            <div className="account-selector-container">
                <select className="account-selector" value={this.state.account} onChange={this.handleSelectedAccountChange}>
                    {this.props.sessionData.accounts.map((account) => (
                        <option key={account} value={account}>{account}</option>
                    ))}
                </select>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sessionData: state.sessionData
});

export default connect(mapStateToProps)(AccountSelector);
