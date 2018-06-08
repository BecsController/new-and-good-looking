const path = require('path')
const fs = require('fs')

const dataPath = './testData/data.json'

//need methods for tournament, tier and fight
//method to get tournament participants

var allData = {test: 'test'};
console.log(getCompetitors());

function refreshData() {
  let raw = fs.readFileSync(dataPath)
  allData = JSON.parse(raw)
}

function overwriteData() {
  let stringified = JSON.stringify(allData, null, 2)
  fs.writeFileSync(dataPath, stringified)
  console.log('writing data');
}

function getCompetitors() {
  refreshData()

  let numToGrab = 8

  let arrOfIDs = getIDs(8)
  let arrOfPlayers = getPlayersFromIDs(arrOfIDs)
  
  return arrOfPlayers

  function getIDs(numToGrab) {
    let playerIDs = []
    let totalPlayers = data.players.length;
    for (var i = 0; playerIDS.length < numToGrab; i++) {
      let newID = getRandomIndexUpTo(totalPlayers)
      if (!Array.contains(playerIDS, newID)) playerIDS.push(newID)
    }
    return playerIDs
  }

  getPlayersFromIDs(arrOfIDs) {
    return arrOfIDs.map(id => {
      return data.players.find(player => {
        player['id'] == id
      })
    })
  }

  function getRandomIndexUpTo(num) {
    return Math.floor(Math.random()*num)
  }
}
