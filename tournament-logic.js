const path = require('path');
const fs = require('fs');
const fightLogic = require('./fight-logic.js');

const dataPath = './data/data.json'

//need methods for tournament, tier and fight
//method to get tournament participants

var allData,
    allIDS,
    nextCompetitors,
    currentMatch,
    players = {
      tierOne: [],
      tierTwo: [],
      tierThree: [],
      winner: []
    },
    currentPlayers,
    nextRoundPlayers,
    tournamentState = {
      tierOne: [0, 0, 0, 0],
      tierTwo: [0, 0],
      tierThree: [0]
    },
    currentTier


refreshData()
console.log(getCompetitors());
getNextCompetitors()
doNextFight();
console.log(tournamentState);

function refreshData() {
  let raw = fs.readFileSync(dataPath)
  allData = JSON.parse(raw)
}

function overwriteData() {
  let stringified = JSON.stringify(allData, null, 2)
  fs.writeFileSync(dataPath, stringified)
  console.log('writing data');
}

function getNextCompetitorIndices() {
  refreshData()

  // get current tier
  if (tournamentState.tierOne.includes(0)) currentTier = tournamentState.tierOne
  else if (tournamentState.tierTwo.inclues(0)) currentTier = tournamentState.tierTwo
  else if (tournamentState.tierThree.includes(0)) currentTier = tournamentState.tierThree

  currentMatch = currentTier.indexOf(0)
  // console.log("Match index is: ",currentMatch);

  return [currentMatch*2, currentMatch*2 + 1]
}

function getPlayersFromIndices(indices) {
  return indices.map(e => currentPlayers[e])
}

function getNextCompetitors() {
  let indices = getNextCompetitorIndices()
  nextCompetitors = getPlayersFromIndices(indices)
  // console.log(harrison[0].id, " ", harrison[1].id);
  return nextCompetitors
}

function doNextFight() {
  let {winner, clashes} = fightLogic.fight(nextCompetitors)

  // alter tournamentState
  if (winner == nextCompetitors[0]) currentTier[currentMatch] = 1
  else currentTier[currentMatch] = 2

  nextRoundPlayers.push(winner)

  return {
    winner,
    clashes
  }
}



function getCompetitors() {
  refreshData()

  let numToGrab = 8

  let arrOfIDs = getIDs(8)
  let arrOfPlayers = getPlayersFromIDs(arrOfIDs)

  // load players into first tier
  players.tierOne = arrOfPlayers
  currentPlayers = arrOfPlayers // shallow coy


  // clear later tiers
  players.tierTwo = []
  players.tierThree = []
  players.winner = []

  // clear tournamentState
  tournamentState.tierOne = [0, 0, 0, 0]
  tournamentState.tierTwo = [0, 0]
  tournamentState.tierOne = [0]

  nextRoundPlayers = players.tierTwo

  return arrOfPlayers

  function getIDs(numToGrab) {
    let playerIDs = []
    let totalPlayers = allData.players.length;
    for (var i = 0; playerIDs.length < numToGrab; i++) {
      let newID = getRandomIndexUpTo(totalPlayers)
      // console.log(newID);
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
      let winner = fight-logic.fight(one, two)
      nextTier.push(winner);
    }
  }

  tournament(nextTier)

  function wins(player) {}
}

module.exports = {
  getCompetitors,
  getNextCompetitors
}
