/*
*
* A CLI utility to count the word frequency of multiple text files.
*
*/

var fs = require('fs');
var text = '';
var wordCount = 0;

if (process.argv.length < 3) {
  console.log(process.argv);
  return console.error('Limit argument and at least one text filename are required');
}

var limit = parseInt(process.argv[2]);

console.log('combining files');

for (var i = 3; i < process.argv.length; i++) {
  var file = fs.readFileSync(process.argv[i], 'utf8');
  text += file;
}

console.log('building word list');

var corpusNoLineBreaks = text.replace(/(?:\r\n|\n)/g, ' ');
var wordListAll = corpusNoLineBreaks.split(' ');

wordList = wordListAll.filter(function(elem, pos) {
    return wordListAll.indexOf(elem) == pos;
});

var frequency = { 'UNK': 0 };

for(word in wordList) {
  wordCount++;
  frequency[wordList[word]] = 0;
}

console.log('found ' + wordCount + ' unique words')
console.log('finding word frequency');

for(word in wordListAll) {
  frequency[wordListAll[word]]++;
}

var freqMatrix = [];

for(key in frequency) {
  freqMatrix.push([frequency[key], key]);
}

console.log('sorting');

sortedMatrix = freqMatrix.sort(function(a, b) {
  return a[0] - b[0];
});

sortedMatrix = sortedMatrix.reverse();

var vocab = '';

for(var i = 0; i < sortedMatrix.length; i++) {
  vocab += sortedMatrix[i][1] + '\n';
  if (i > limit) {
  	break;
  }
}

fs.writeFileSync('vocab', vocab);
