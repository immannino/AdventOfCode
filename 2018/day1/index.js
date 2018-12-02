const fs = require('fs');

function getTestData(filename) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(filename).toString().split("\n");
        resolve(data);
    });
}
/**
 * Solution 1 for Day 1 of Advent of Code
 */
async function calibrateFrequencyDriftDevice(numericalReadings, reducer) {
    return numericalReadings.reduce(reducer, 0);
}

/**
 * Solution 2 for Day 1 of Advent of Code
 * 
 * @param {*} rawNumericalReadings 
 */
async function calibrateFrequencyDriftDeviceDuplicates(numericalReadings) {
    let solutions = new Map();
    let hasDuplicate = false;
    let duplicateSum = 0;
    let rollingSum = 0;
    solutions.set(0, 1);

    while (!hasDuplicate) {
        for (let i = 0; i < numericalReadings.length; i++) {
            let tempSum = rollingSum + numericalReadings[i];
            if (solutions.has(tempSum)) {
                duplicateSum = tempSum;
                hasDuplicate = true;
                break;
            } else {
                solutions.set(tempSum, 1);
                rollingSum = tempSum;
            }
        }
    }

    return duplicateSum;
}

(async () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const rawNumericalReadings = await getTestData('testdata.txt');
    const numericalReadings = rawNumericalReadings.map((item) => Number(item));

    const calibrationResults = await calibrateFrequencyDriftDevice(numericalReadings, reducer);
    console.log(`\x1b[44m\x1b[37mFrequency Drift Calibration results: \x1b[4m${calibrationResults}\x1b[0m`);

    const duplicate = await calibrateFrequencyDriftDeviceDuplicates(numericalReadings);
    console.log(`\x1b[44m\x1b[37mFrequency Drift Duplicate results: \x1b[4m${duplicate}\x1b[0m`);
})();