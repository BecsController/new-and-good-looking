const path = require('path')
const dataPath = './data.json'

//need methods for tournament, tier and fight
//method to get tournament participants

var allData;


function readDataIn() {
  let raw = fs.readFileSync(dataPath)
  allData = JSON.parse(raw)
}
