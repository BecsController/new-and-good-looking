let sampleData = [
  {
    "img": "insertURLhere",
    "id": 0,
    "name": "France",
    "properties": {
      "GDP": [
        4,
        "$2,835,000,000,000"
      ],
      "Monument": [
        8,
        "Eiffel Tower"
      ],
      "Famous Food/Drink": [
        10,
        "Cheese"
      ],
      "Nutjob Politician": [
        8,
        "Marine Le Pen"
      ],
      "Top Single": [
        "2",
        "Butterfly - Danyel Gerard"
      ]
    }
  },
  {
    "img": "insertURLhere",
    "id": 1,
    "name": "USA",
    "properties": {
      "GDP": [
        8,
        "$19,390,000,000,000"
      ],
      "Monument": [
        8,
        "Statue of Liberty"
      ],
      "Famous Food/Drink": [
        8,
        "Hot Dogs"
      ],
      "Nutjob Politician": [
        10,
        "Donald J. Trump"
      ],
      "Top Single": [
        7,
        "White Christmas - Bing Crosby"
      ],
      "Extra unshared Key":[
        10,
        "This is the unshared key"
      ]
    }
  }
];

fight(sampleData);

function fight(harrison) {
  let one = harrison[0];
  let oneScore = 0
  let two = harrison[1];
  let twoScore = 0;

  //Starts by comparing every shared property.
  let oneKeys = Object.keys(one.properties);
  let twoKeys = Object.keys(two.properties);
  let sharedValues = [];
  let unsharedValues = [];

  oneKeys.map((x) => unsharedValues.push(x)); //has a redundant return
  //console.log('////////////////Unshared values of One');
  //console.log(unsharedValues);



  for (let key of twoKeys){
    if (unsharedValues.includes(key)){
      // console.log('Shared keys keys includes: ', key);
      unsharedValues.splice(unsharedValues.indexOf(key), 1)//removes shared value from array
      sharedValues.push(key) //adds to shared
      /*remove from unshared values, add to shared values*/
    } else {
      // console.log('unique key to two keys: ', key);
      unsharedValues.push(key)
      /*add key to unshared values*/
    }
  }

  //console.log('//////////////////Function is done, should have two arrays, logs to check ///////////////////');

  //console.log('////////////SHARED VALUUUUUUUUUUES!//////////');
  //console.log(sharedValues);
  //console.log('///////////////////////UNSHAAAAAAAAAAARED VAAAAALLLLLYYYYYYYYESS!!!!////////');
  //console.log(unsharedValues);

  // Compares shared values and adds points.

  let clashes = []

  for (let key of sharedValues){
    if (one.properties[key][0] > two.properties[key][0]){
      // console.log(one.name, " beats ", two.name, " at ", key);
      clashes.push({"property":key, "winner":one.name})
      oneScore++;
    } else if (one.properties[key][0] < two.properties[key][0]) {
      // console.log(two.name, " beats ", one.name, " at ", key);
      clashes.push({"property":key, "winner":two.name})
      twoScore++;
    } else {
      // console.log("Its a draw on", key);
    }
  }

  // console.log(clashes);

  //Seeks user input for every* unshared propery (may cap this later)

  ///////////////////////////THIS IS WHERE WE TAKE USER INPUT ON UNSHAREDS!////////////////////////////

  //Return the winner
  if (oneScore > twoScore){
    // console.log(one.name, " wins!");
    return {"winner":one, "clashes":clashes};
  } else if (oneScore < twoScore){
    // console.log(two.name, " wins!");
    return {"winner":two, "clashes":clashes}
  } else {
    console.log("It's a draw, winner is a cointoss");
    if (Math.random <.5){
      // console.log(one.name, " wins!");
      return {"winner":one, "clashes":clashes};
    } else {
      // console.log(two.name, " wins!");
      return {"winner":two, "clashes":clashes}
    }
  }
}





module.exports = {
  fight
}
