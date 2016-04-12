var fs = require('fs')
var cmuDictFile = readDictFile('./cmudict.txt')
var testDictFile = readDictFile('./testdict.txt')
var LOOKUP = {}

// Use Sync file read to make sure all the data is loaded before performing any
// actions
function readDictFile (file) {
  return fs.readFileSync(file).toString()
}

// Takes a dict file and formats it by separating the word and its phoneme
// syllables
// Then it will populate a LOOKUP table that stores each word by the number of
// syllables
function formatAndLoadData (data) {
  var lines = data.toString().split('\n'),
      lineSplit
  lines.forEach(function (line) {
    lineSplit = line.split('  ')
    addToLookup(lineSplit[0], getSyllables(lineSplit[1]))
  })
}

// returns the number of syllables of the input word (in phoneme format)
function getSyllables (word) {
  // checks that word has a value
  if (word) {
    var match = word.match(/\d/gi)
  }
  // checks if match found something, returns length of the match array or 0
  return match ? match.length : 0
}

// adds to an object with the # of syllables as the property and adds the word
// to an array stored in that property
function addToLookup (word, syllables) {
  // checks if syllable is in the lookup table already
  if (LOOKUP.hasOwnProperty(syllables)) {
    // pushes to the existing array if it is found
    LOOKUP[syllables].push(word)
  } else {
    // creates a new property and adds the word to an array
    LOOKUP[syllables] = [word]
  }
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Generate random INT number between min and max
function getRandNumBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate random word with the input syllables from the LOOKUP object
function getRandWordWith (syllables) {
  // initialize the array of words with the input syllable
  var syllableArr = LOOKUP[syllables],
    // initialize how many words there are in the array
      syllableArrLen = syllableArr.length
      // get a random index based on the number of words in the array
      randIndex = getRandNumBetween (0, syllableArrLen)
  // return the random word
  return syllableArr[randIndex]
}

// Function that creates a Haiku based on a specific structure
// Nested array with each element representing how many syllables a line will
// have, e.g [[5], [7], [5]], would look like:
// Line 1: 5 syllable word,
// Line 2: 7 syllable word,
// Line 3: 5 syllable word
// Can also have multiple words: [[3, 2], [1, 3, 3,], [2, 3]], would look like:
// Line 1: 3 syllable word and 2 syllable word,
// Line 2: 1 syllable word, 3 syllable word and 3 syllable word,
// Line 3: 2 syllable word and 3 syllable word
function createHaiku (structure) {
  // maps through structure to see how many syllables each line needs
  return structure.map(function (line) {
    // maps each word within a line to see how many syllables each word needs
    return line.map(function (syllables) {
      // returns a random word that has the input syllables
      return getRandWordWith(syllables)
    // joins each word on a line with a space
    }).join(' ')
  // joins each line with a newline char to output as a poem
  }).join('\n')
}

// run formatAndLoadData function to get data from the dict file and populate the
// LOOKUP table
formatAndLoadData(cmuDictFile)

// export createHaiku so other files can use this function
module.exports.createHaiku = createHaiku

// export LOOKUP table so other files have access to the words organized by
// syllable count
module.exports.WORDS = LOOKUP
