let getCurrentPlayerBet = (currentPlayer, bets) => {
    for(let bet of bets) {
        if(bet.player === currentPlayer) {
            return bet.amount;
        }
    }
};

let isCurrentPlayerReadyToRace = (currentPlayer, bets) => {
    for(let bet of bets) {
        if(bet.player === currentPlayer) {
            return bet.playerReadyToRace;
        }
    }
    return false;
};

let getWinners = (winnerHorse, bets) => {
    let winners = [];
    for(let bet of bets) {
        if(bet.index === winnerHorse) {
            winners.push(bet.player);
        }
    }
    return winners;
};

module.exports = {
    getCurrentPlayerBet,
    isCurrentPlayerReadyToRace,
    getWinners
};