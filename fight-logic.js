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

  for (let key of twoKeys){

  }

  //Seeks user input for every* unshared propery (may cap this later)


  //Return the winner
  if (oneScore > twoScore){
    return one;
  } else {
    return two;
  }
}





module.exports = {
  fight
}
