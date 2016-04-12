var haiku = require('./haiku')
var createHaiku = haiku.createHaiku
var WORDS = haiku.WORDS

console.log('Haiku with [[2, 3], [1, 3, 3], [3, 2]] format: ')
console.log(createHaiku([[2,3], [1,3,3], [3,2]], WORDS))

console.log('\n')

console.log('Haiku with [[5], [7], [5]] format: ')
console.log(createHaiku([[5], [7], [5]], WORDS))
