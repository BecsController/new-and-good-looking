const path = require('path')
const fs = require('fs')

const dataPath = './data/test.json'

//need methods for tournament, tier and fight
//method to get tournament participants

var allData = {test: 'test'};
writeData()

function readDataIn() {
  let raw = fs.readFileSync(dataPath)
  allData = JSON.parse(raw)
}

function writeData() {
  let stringified = JSON.stringify(allData, null, 2)
  fs.writeFileSync(dataPath, stringified)
  console.log('writing data');
}
