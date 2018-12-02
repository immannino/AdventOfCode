/**
 * Create a hashmap of the inputs
 * 1. split string by ' '
 * 2. Push array elements into hash map. 
 * 3. If element in map, move to next array. 
 * 4. else count ++
 */
var fs = require('fs');

function solvePart1() {
    var passphrases = fs.readFileSync('day4-data2.txt').toString().split("\n");
    var validPassphrases = 0;
    
    for (let i = 0; i < passphrases.length; i++) {
        let words = passphrases[i].split(" ");
        let wordsMap = new Map();
        let isValidPassphrase = true;
    
        for (let j = 0; j < words.length; j++) {
            if (wordsMap.has(words[j])) {
                isValidPassphrase = false;
                break;
            } else {
                wordsMap.set(words[j], 1);
            }
        }
        if (isValidPassphrase) {
            validPassphrases++;
        }
    }

    console.log(validPassphrases);
}

function part1SolutionEvolvedForPart2() {
    var passphrases = fs.readFileSync('day4-data2.txt').toString().split("\n");
    var validPassphrases = [];
    
    for (let i = 0; i < passphrases.length; i++) {
        let words = passphrases[i].split(" ");
        let wordsMap = new Map();
        let isValidPassphrase = true;
    
        for (let j = 0; j < words.length; j++) {
            if (wordsMap.has(words[j])) {
                isValidPassphrase = false;
                break;
            } else {
                wordsMap.set(words[j], 1);
            }
        }
        if (isValidPassphrase) {
            validPassphrases.push(passphrases[i]);
        }
    }
    console.log("Part 1 Valid: " + validPassphrases.length);
    solvePart2(validPassphrases);
}

function solvePart2(passphrases) {
    var validPassphrases = 0;

    for (let i = 0; i < passphrases.length; i++) {
        let words = passphrases[i].split(" ");
        let isValidPassphrase = true;

        if (isValidPassphrase) {
            validPassphrases++;
        }
    }

    console.log(validPassphrases);
}

part1SolutionEvolvedForPart2();