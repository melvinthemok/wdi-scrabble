var fs = require('fs')
var text = fs.readFileSync('./enable1.txt').toString('utf-8')
var textByLine = text.split('\r\n')

// function scrabble (inputString, outputString) {
//   var material = {}
//   for (var i = 0; i < inputString.length; i++) {
//     var letter = inputString[i]
//     material[letter] = (material[letter] || 0) + 1
//   }
//   var product = {}
//   for (var j = 0; j < outputString.length; j++) {
//     var char = outputString[j]
//     if (!(char in material)) {
//       return false
//     } else {
//       product[char] = (product[char] || 0) + 1
//     }
//   }
//   for (var k in product) {
//     if (material[k] < product[k]) {
//       return false
//     }
//   }
//   return true
// }
//
// console.log(scrabble('fodie', 'foodie'))
//
function scrabble (inputString, outputString) {
  for (var i = 0; i < outputString.length; i++) {
    var letter = outputString[i]
    if (inputString.indexOf(letter) === -1) {
      return false
    }
    inputString = inputString.replace(letter, '')
  }
  return true
}

// console.log(scrabble('zoology', 'goo'))

function scrabbleBlank (inputString, outputString) {
  for (var j = 0; j < outputString.length; j++) {
    var letter = outputString[j]
    if (inputString.indexOf(letter) === -1) {
      if (inputString.indexOf('?') > -1) {
        inputString = inputString.replace('?', '')
      } else {
        return false
      }
    } else {
      inputString = inputString.replace(letter, '')
    }
  }
  return true
}

// console.log(scrabbleBlank('z??hr?', 'zephyr'))

function longest (inputString) {
  function maximum (word) {
    return word.length <= inputString.length
  }
  var wordList = textByLine.filter(maximum)

  var lengthy = ''

  for (var k = 0; k < wordList.length; k++) {
    var currentOutput = wordList[k]
    if (scrabbleBlank(inputString, currentOutput) === true) {
      if (currentOutput.length > lengthy.length) {
        lengthy = currentOutput
      }
    }
  }
  return lengthy
}

// console.log(longest('vaakojeaietg????????'))

function valuation (string) {
  var scoreKey = {
    'a': 1,
    'b': 3,
    'c': 3,
    'd': 2,
    'e': 1,
    'f': 4,
    'g': 2,
    'h': 4,
    'i': 1,
    'j': 8,
    'k': 5,
    'l': 1,
    'm': 3,
    'n': 1,
    'o': 1,
    'p': 3,
    'q': 10,
    'r': 1,
    's': 1,
    't': 1,
    'u': 1,
    'v': 4,
    'w': 4,
    'x': 8,
    'y': 4,
    'z': 10
  }
  var score = 0
  for (var l = 0; l < string.length; l++) {
    var char = string[l]
    score += scoreKey[char]
  }
  return score
}

// console.log(valuation('zoo'))

function usedLetters (inputString, outputString) {
  var usedLetters = ''
  for (var m = 0; m < outputString.length; m++) {
    var letter = outputString[m]
    if (inputString.indexOf(letter) === -1) {
      if (inputString.indexOf('?') > -1) {
        inputString = inputString.replace('?', '')
      } else {
        return false
      }
    } else {
      usedLetters += letter
      inputString = inputString.replace(letter, '')
    }
  }
  return usedLetters
}

// usedLetters('vaakojeaietg????????', 'jackknives')

function highest (inputString) {
  function maximum (word) {
    return word.length <= inputString.length
  }
  var wordList = textByLine.filter(maximum)

  var valuable = ''
  var value = 0

  for (var n = 0; n < wordList.length; n++) {
    var currentOutput = wordList[n]
    if (scrabbleBlank(inputString, currentOutput) === true) {
      if (valuation(usedLetters(inputString, currentOutput)) > value) {
        value = valuation(usedLetters(inputString, currentOutput))
        valuable = currentOutput
      }
    }
  }
  return valuable
}

// console.log(highest('vaakojeaietg????????'))
