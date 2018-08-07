import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

let reducer = (state = {sounds: true}, {type, payload} ) => {
    switch(type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                attemptingToConnect: true
            });
        case 'SESSION_STATUS_UPDATE':
            return Object.assign({}, state, {
                sessionData: payload.sessionData,
                attemptingToConnect: false
            });
        case 'SELECT_ACCOUNT':
            return Object.assign({}, state, {
                account: payload.account
            });
        case 'SET_SOUNDS':
            return Object.assign({}, state, {
                sounds: payload.sounds
            });
        case 'CONTRACT_STATE_UPDATE':
            return Object.assign({}, state, {
                contractState: payload.contractState,
                lastEvent: payload.eventDescription
            });
        case 'RACE_ANIMATION_ENDED':
            return Object.assign({}, state, {
                lastEvent: 'Race animation ended'
            });
        case 'PLAY_SOUND':
            return Object.assign({}, state, {
                currentSound: payload.sound
            });
        default: return state;
    }
}

const socketHandler = (socket) => (store) => (next) => (action) => {
    switch(action.type) {
        case 'PLACE_BET':
        case 'PLAYER_READY_TO_RACE':
        case 'LOGIN':
        case 'SET_SOUNDS':
        case 'LOGOUT':
        socket.emit('action', action); break;
        default: break;
    }
    next(action);
};

const socket = io.connect('/');

const middleWare = applyMiddleware(socketHandler(socket));

const store = createStore(reducer, middleWare);

socket.on('action', (data) => {
    store.dispatch(data);
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
