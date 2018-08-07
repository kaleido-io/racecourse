pragma solidity ^0.4.2;

contract Race {
    
    uint public horseCount;
        
    uint public playersCount;

    uint public playersReadyToRace;
    
    bool public raceFinished;
    
    uint public betCount;
    
    uint public winnerHorse;
    
    uint public jackpot;

    struct Horse {
        uint id;
        string name;
    }
    
    struct Bet {
        uint index;
        address player;
        uint amount;
        bool readyToRace;
    }

    mapping(uint => Horse) public horses;
    
    mapping(uint => Bet) public bets;
    
    mapping(address => bool) public players;
    
    constructor() public {
        addHorse("Secretariat");
        addHorse("Man O' War");
        addHorse("Seabiscuit");
        addHorse("Phar Lap");
        addHorse("Frankel");
    }

    function addHorse (string name) private {
        horses[horseCount++] = Horse(horseCount, name);
    }
    
    function placeBet (uint index, uint amount) public {
        require(index >=0 && index < horseCount);

        if(raceFinished) {
            reset();
        }
        
        require(!players[msg.sender]);
        bets[betCount++] = Bet(index, msg.sender, amount, false);
        players[msg.sender] = true;
        playersCount++;
        jackpot += amount;
        
        emit betPlaced();
    }
    
    function playerReadyToRace () public {
        require(players[msg.sender]);

        bool playerReady = false;
        for (uint i=0; i<betCount; i++) {
            if(bets[i].player == msg.sender && !bets[i].readyToRace) {
                bets[i].readyToRace = true;
                playerReady = true;
                break;
            }
        }

        require(playerReady);
        
        playersReadyToRace++;
        emit playersReadyToRaceChanged();

        if(playersReadyToRace == playersCount) {
            winnerHorse = uint8(uint256(keccak256(block.timestamp, block.difficulty))%horseCount);
            raceFinished = true;
            emit finishedRace();
        }
    }
    
    function reset () private {
        for (uint i=0; i<betCount; i++) {
            delete players[bets[i].player];
            if(bets[i].index == winnerHorse) {
                jackpot = 0;
            }
            delete bets[i];
        }
        playersCount = 0;
        betCount = 0;
        playersReadyToRace = 0;
        raceFinished = false;
        winnerHorse = 0;
    }
    
    event betPlaced ();

    event playersReadyToRaceChanged();
    
    event finishedRace ();

}
