const fs = require('fs');

function getTestData(filename) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(filename).toString().split("\n");
        resolve(data);
    });
}

/**
 * Node implementation of Python's Zip
 */
function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

module.exports = {
    getTestData,
    zip
}