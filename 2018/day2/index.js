const { getTestData, zip } = require('../utilities');

/**
 * Solution 1:
 * 
 * Not clean by any means, but I just got lazy.
 * 
 * I also had the correct solution originally, but at the bottom I was returning
 * the double count * double count, and it took me 30 minutes to figure that one 
 * out. I'm an idiot.
 */
async function validateBoxIds(boxIds) {
    let checksumMeta = {
        double: 0,
        triple: 0
    };
    
    for (let id of boxIds) {
        let elements = id.trim().split('');
        let occurances = {};

        for (let element of elements) {
            if (occurances[element]) occurances[element] += 1;
            else occurances[element] = 1;
        }

        let doubles = Object.values(occurances).includes(2);
        let triples = Object.values(occurances).includes(3);

        if (doubles) checksumMeta.double++;
        if (triples) checksumMeta.triple++;
    }

    return (checksumMeta.double * checksumMeta.triple);
}

/**
 * Solution for Part 2
 */
async function findMatchingBoxes(boxIds) {
    for (let [i, id] of boxIds.entries()) {
        let others = Array.from(boxIds);

        others.splice(i, 1);

        for (let other of others) {
            const isSimilar = await hasSimilar(id, other);

            if (isSimilar) {
                let temp = await commonChars(id, other);
                return temp;
            }
        }
    }
}

function commonChars(primary, temp) {
    let iterable = zip([primary.trim().split(''), temp.trim().split('')]);
    let commonElements = primary.trim().split('');

    for (let i = 0; i < iterable.length; i++) {
        if (iterable[i][0] !== iterable[i][1]) {
            commonElements.splice(i, 1);
            break;
        }
    }

    return commonElements.join('');
}

/**
 * Performs a similarity search on them to validate
 * if they only differ by 1 single char.
 */
function hasSimilar(primary, temp) {
    let differCount = 0;

    if (primary.length !== temp.length) return false;

    let iterable = zip([primary.trim().split(''), temp.trim().split('')]);

    for (let i = 0; i < iterable.length; i++) {
        if (iterable[i][0] !== iterable[i][1]) {
            if (differCount > 0) return false;
            else differCount++;
        }
    }

    return true;
}

(async () => {
    console.time('Load');
    const boxIds = await getTestData('testdata.txt');
    console.timeEnd('Load');

    console.time('checksum');
    const checksum = await validateBoxIds(boxIds);
    console.timeEnd('checksum');
    console.log(`\x1b[44m\x1b[37mWarehouse Box Validation: \x1b[4m${checksum}\x1b[0m`);

    console.time('match');
    const matchingChars = await findMatchingBoxes(boxIds);
    console.timeEnd('match');
    console.log(`\x1b[44m\x1b[37mMatching Boxes: \x1b[4m${matchingChars}\x1b[0m`);
})();