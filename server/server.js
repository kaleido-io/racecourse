const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const { APPLICATION_PORT } = require('./constants');
const session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  });
const sharedsession = require("express-socket.io-session");
const Racecourse = require('./Racecourse');

const racecourses = {};

const contractAddresses = {};

app.use(session);

io.use(sharedsession(session));

app.use(express.static(path.resolve(__dirname + '/../client/build')));

io.on('connection', (socket) => {

    let eventListener = (eventLabel) => {
        console.log('Event: ' + eventLabel + ' (client ' + socket.handshake.session.id + ')');
        dispatchContratStateUpdate(socket, 'Contract status changed');
    };

    dispatchSessionInformation(socket);

    if(racecourses[socket.handshake.session.id]) {
        dispatchContratStateUpdate(socket, 'Initialization');
    }
    
    socket.on('action', ({ type, payload }) => {
        switch (type) {
            case 'LOGIN':
                handleLogin(socket, payload.url, payload.user, payload.password, eventListener);
                break;
            case 'LOGOUT':
                handleLogout(socket);
                break;
            case 'PLACE_BET':
                racecourses[socket.handshake.session.id].placeBet(payload.index, payload.amount, payload.account);
                break;
            case 'PLAYER_READY_TO_RACE':
                racecourses[socket.handshake.session.id].playerReadyToRace(payload.account);
                break;
        }
    });

});


let handleLogin = (socket, url, user, password, eventListener) => {

    index1 = url.indexOf(':', 8);
    index2 = url.indexOf('@', 8);

    if (index1 !== -1 && index2 !== -1) {
        user = url.substring(8, index1);
        password = url.substring(index1 + 1, index2);
        url = 'https://' + url.substring(index2 + 1);
    }

    console.log('Attempting to connect to ' + url + ' with user "' + (user || '') + '" (client ' + socket.handshake.session.id + ')');

    let racecourse = new Racecourse();
    racecourse.init(url, user, password, eventListener, contractAddresses[url], (status) => {console.log(status)}).then(() => {
        contractAddresses[url] = racecourse.contractInstance.address;
        racecourses[socket.handshake.session.id] = racecourse;
        socket.handshake.session.data = {
            loginFailed: false,
            accounts: racecourse.accounts,
            url: url,
            user: user
        };
        socket.handshake.session.save();
        dispatchContratStateUpdate(socket, 'Initialization');
        dispatchSessionInformation(socket);
    }).catch((error) => {
        console.log('Could not initialize contract')
        console.log(error)
        socket.handshake.session.data = {
            loginFailed: true
        };
        socket.handshake.session.save();
        dispatchSessionInformation(socket);
    });
};

let handleLogout = (socket) => {
    console.log('Disconnected from ' + socket.handshake.session.data.url + ' with user "' + (socket.handshake.session.data.user || '') + '" (client ' + socket.handshake.session.id + ')');
    racecourses[socket.handshake.session.id].stopWatching();
    delete racecourses[socket.handshake.session.id];
    delete socket.handshake.session.data;
    socket.handshake.session.save();
    dispatchSessionInformation(socket);
};

let dispatchSessionInformation = (socket) => {
    socket.emit('action', { type: 'SESSION_STATUS_UPDATE', payload: {
        sessionData: socket.handshake.session.data || {}
    }});
};

let dispatchContratStateUpdate = (socket, eventDescription) => {
    racecourses[socket.handshake.session.id].getState().then((contractState) => {
        socket.emit('action', { type: 'CONTRACT_STATE_UPDATE', payload: { contractState, eventDescription } });
    });
};

console.log('Server started on port ' + APPLICATION_PORT);
server.listen(APPLICATION_PORT);
