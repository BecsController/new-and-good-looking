const fs = require('fs')

let data = {
  players: [],
  properties: []
}

let totalPlayers = 50

for (var i = 0; i < totalPlayers; i++) {
  data.players.push(createBlankPlayer(i))
}

fs.writeFileSync('data.json', JSON.stringify(data, null, 2))

function createBlankPlayer(id) {
  let player = {
    'id': id,
    'name': "name" + id,
    'properties': {}
  }

  for (var i = 0; i < 5; i++) {
    addBlankProperty(player, 'dummy' + i)
  }

  return player

  function addBlankProperty(obj, name) {
    obj.properties[name] = ['strength', 'display']
  }
}
