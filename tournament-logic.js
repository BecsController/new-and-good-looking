const path = require('path');
const fs = require('fs');
const fightLogic = require('./fight-logic.js');

const dataPath = './data/data.json'

//need methods for tournament, tier and fight
//method to get tournament participants

var allData,
    nextGamePlayers,
    currentMatch,
    players = {
      tiers: [],
      winner: {},
      display: []
    },
    currentPlayers,
    nextRoundPlayers,
    tournamentRecord = [],
    currentTier


// refreshData()
// console.log(newCompetitors());
// getNextCompetitors()
// doNextFight();
// console.log(tournamentRecord);

function refreshData() {
  let raw = fs.readFileSync(dataPath)
  allData = JSON.parse(raw)
}

function overwriteData() {
  let stringified = JSON.stringify(allData, null, 2)
  fs.writeFileSync(dataPath, stringified)
  console.log('writing data');
}

function refreshState() {
  // reset game tracking numbers
  currentTier = 0;
  currentMatch = 0;

  // loop through to find first uncompleted tier and game
  while (currentTier < tournamentRecord.length) {
    currentMatch = tournamentRecord[currentTier].indexOf(0)
    // no unplayed game in this tier
    if (currentMatch < 0) currentTier++
    // otherwise we found an unplayed game
    else break;
  }
  // is it time to create the next tier
  if (currentMatch == -1) {
    let currentTierSize = tournamentRecord[currentTier - 1].length
    let nextTierSize = Math.floor(currentTierSize/2)

    if (!nextTierSize) {
      // we hav a winner
      players.winner
    } else {
      // still mroe to go, create next Tier and set match index to 0
      tournamentRecord.push(Array(nextTierSize).fill(0))
      currentMatch = 0

      // update currentPlayers to point at the next round set
      currentPlayers = nextRoundPlayers

      // set up next tier to reciev winners
      nextRoundPlayers = []
      players.tiers.push(nextRoundPlayers)
    }
  }
}


function getNextCompetitorIndices() {
  return [currentMatch*2, currentMatch*2 + 1]
}

function getPlayersFromIndices(indices) {
  return indices.map(e => currentPlayers[e])
}

function getNextCompetitors() {
  refreshState()
  let indices = getNextCompetitorIndices()
  nextGamePlayers = getPlayersFromIndices(indices)
  return nextGamePlayers
}

function doNextFight() {
  getNextCompetitors()

  let {winner, clashes} = fightLogic.fight(nextGamePlayers),
      loser;

  // alter tournamentRecord
  if (winner == nextGamePlayers[0]) {
    tournamentRecord[currentTier][currentMatch] = 1
    loser = nextGamePlayers[1]
  } else {
    tournamentRecord[currentTier][currentMatch] = 2
    loser = nextGamePlayers[0]
  }

  // filter loser out of plaeyers to display
  players.display = players.display.filter(player => {
    return player.id != loser.id
  })

  nextRoundPlayers.push(winner)

  return {
    winner,
    clashes
  }
}

function getCompetitors() {
  return players.display
}



function newCompetitors() {
  refreshData()

  // number of players to get
  let numToGrab = 8
  currentTier = 0


  let arrOfIDs = getIDs(numToGrab)
  let arrOfPlayers = getPlayersFromIDs(arrOfIDs)

  tournamentRecord = []
  players.tiers = []
  players.display = []
  players.winner = {}

  // set up first arrya in tournament record to track results
  tournamentRecord.push(Array(numToGrab/2).fill(0))

  // load players into first tier
  players.tiers.push(arrOfPlayers)
  currentPlayers = arrOfPlayers.slice()
  players.display = arrOfPlayers.slice()

  // prepare next empty tier
  nextRoundPlayers = []
  players.tiers.push(nextRoundPlayers)

  return arrOfPlayers

  function getIDs(numToGrab) {
    let playerIDs = []
    let totalPlayers = allData.players.length;
    for (var i = 0; playerIDs.length < numToGrab; i++) {
      let newID = getRandomIndexUpTo(totalPlayers)
      if (!playerIDs.includes(newID)) playerIDs.push(newID)
    }
    return playerIDs
  }

  function getPlayersFromIDs(arrOfIDs) {
    return arrOfIDs.map(id => {
      return allData.players.find(player => {
        return player['id'] == id
      })
    })
  }

  function getRandomIndexUpTo(num) {
    return Math.floor(Math.random()*num)
  }
}

function tournament(competitors) {
  // function displayTier() {} to be written

  if (competitors.length == 1) {
    wins(competitor[0])
  } else {
    let half = competitors.length/2
    let nextTier = []
    for (var i = 0; i < half; i++) {
      let one = competitors[i]
      let two = competitors[i + half]
      let winner = fightLogic.fight(one, two)
      nextTier.push(winner);
    }
  }

  tournament(nextTier)

  function wins(player) {}
}

module.exports = {
  newCompetitors,
  getCompetitors,
  getNextCompetitors,
  doNextFight
}
