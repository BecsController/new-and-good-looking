const path = require('path');
const fs = require('fs');
const fightLogic = require('./fight-logic.js');

const dataPath = './data/data.json'

//need methods for tournament, tier and fight
//method to get tournament participants

var allData,
    allIDS,
    nextCompetitors,
    players = {
      tierOne: [],
      tierTwo: [],
      tierThree: [],
      winner: {}
    },
    tournamentState = {
      tierOne: [0, 0, 0, 0],
      tierTwo: [0, 0],
      tierThree: [0]
    }


// refreshData()
// console.log(getCompetitors());
// // nextCompetitors = getNextCompetitors()
// doNextFight();

function refreshData() {
  let raw = fs.readFileSync(dataPath)
  allData = JSON.parse(raw)
}

function overwriteData() {
  let stringified = JSON.stringify(allData, null, 2)
  fs.writeFileSync(dataPath, stringified)
  console.log('writing data');
}

function getNextCompetitors() {
  refreshData()
  let currentTier
  //  if there are games left at the first tier
  if (tournamentState.tierOne.includes(0)) currentTier = tournamentState.tierOne
  else if (tournamentState.tierTwo.inclues(0)) currentTier = tournamentState.tierTwo
  else if (tournamentState.tierThree.includes(0)) currentTier = tournamentState.tierThree

  let currentMatch = currentTier.indexOf(0)
  // console.log("Match index is: ",currentMatch);

  let first = players.tierOne[currentMatch*2],
      second = players.tierOne[currentMatch*2+1]
  let harrison = [first, second]
  // console.log(harrison[0].id, " ", harrison[1].id);
  return harrison
}

function doNextFight() {
  let harrison = getNextCompetitors()
  let {winner, clashes} = fightLogic.fight(harrison)

  // alter tournamentState
  if (winner == harrison[0])

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

  players.tierOne = arrOfPlayers

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
