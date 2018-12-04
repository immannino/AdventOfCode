const { getTestData } = require('../utilities');-

function parseData(data) {
    let formatted = [];

    // for (let item of data) {
    //     item.trim();
    //     let temp = item.split(' ');
    //     let coords = item[2].split(',');
    //     let size = item[3].split('x');

    //     formatted.push({
    //         id: temp[0],
    //         x: coords[0],
    //         y: coords[1].substring(coords[1].length - 1),
    //         width: size[0],
    //         height: size[1]
    //     });
    //     console.log(formatted[0].y);
    // }
};

(async () => {
    const data = getTestData('testdata.txt');

    console.log(`\x1b[44m\x1b[37mSolution 1: \x1b[4m${'pending'}\x1b[0m`);
    console.log(`\x1b[44m\x1b[37mSolution 2: \x1b[4m${'pending'}\x1b[0m`);
})();