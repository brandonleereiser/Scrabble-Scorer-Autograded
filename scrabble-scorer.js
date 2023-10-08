// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
let tempWord = "";

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
	let letterPoints = "";
   
	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in oldPointStructure) {

		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         console.log(letterPoints)
            return letterPoints;
		 }
 
	  }
	}
	
 }
 
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   tempWord = input.question("Let's play some scrabble! \nPlease enter a word to score:");
  // for (let j = 0; j < tempWord.length; j++){
      // console.log(oldScrabbleScorer(tempWord[j]))
   // }
   return tempWord;
}

function simpleScorer(word){
   word = word.toUpperCase();
	let letterPoints = "";
   let totalScore = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += `Points for ${word[i]}`;
      totalScore++;
   }
   letterPoints += `Total points for '${word}': ${totalScore}`;
   return totalScore;
};

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let totalScore = 0;
   for (let i = 0; i < word.length; i++){
      if (["A", "E", "I", "O", "U"].includes(word[i])){
         totalScore += 3
      } else {
         totalScore += 1
      }
   }
   return totalScore;
}

function scrabbleScorer(word) {
  // word = word.toUpperCase();
   totalScore = 0;
   for (let i = 0; i < word.length; i++){
      totalScore += Number(newPointStructure[word[i]]);
   }
   return totalScore;
}

const scoringAlgorithms = [
   {
      name: "Scrabble",
      descripton: "The traditional scoring algorithm.",
      scoringFunction: scrabbleScorer,
   },
   {
      name: "Simple Score",
      descripton: "Each letter is worth 1 point.",
      scoringFunction: simpleScorer,
   },
   {
      name: "Bonus Vowels",
      descripton: "Vowels are worth 3 pts, consonsants are 1 pt.",
      scoringFunction: vowelBonusScorer,
   },
];

function scorerPrompt() {
   console.log("What scoring algorithm would you like to use?")
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}:${scoringAlgorithms[i].descripton}`)
   }
   userInput = input.question("Please enter 0, 1, 2");
   console.log(`score for '${tempWord}': ${scoringAlgorithms[userInput].scoringFunction(tempWord)}`)
}

function transform(words) {
   let tempObject = {};
   for (let word in words){
      let newWord = words[word]
      for (let i = 0; i < newWord.length; i++){
         tempObject[newWord[i].toLowerCase()] = Number(word)
       }
   }
   return tempObject
};

let newPointStructure = transform(oldPointStructure)

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
