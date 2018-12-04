const { getTestData } = require('../utilities');

function formatData(data) {
    let formatted = [];

    for (let item of data) {
        let temp = item.trim().split(' ');
        let coords = temp[2].split(',');
        let size = temp[3].split('x');

        formatted.push({
            id: temp[0],
            x: Number(coords[0]),
            y: Number(coords[1].substring(0, coords[1].length - 1)),
            width: Number(size[0]),
            height: Number(size[1])
        });
    }

    return formatted;
};

function buildCoordinatesMap(data) {
    let grid = {};

    for (let element of data) {
        for (let y = element.y; y < (element.y + element.height); y++ ) {
            if (!grid[y]) grid[y] = {};
            for (let x = element.x; x < (element.x + element.width); x++) {
                if (!grid[y][x]) {
                    grid[y][x] = element.id;
                } else {
                    grid[y][x] = 'X';
                }
                // console.log(grid);
            }
        }
    }

    return grid;
}

function filterCrosses(data) {
    let totalCount = 0;

    for (let row of Object.keys(data)) {
        let xVals = Object.values(data[row]);
        let count = xVals.filter((val) => val === 'X').length;
        
        totalCount += count;
    }

    return totalCount;
}

function findPristineClaim(data, grid) {
    let pristineElement = null;

    for (let element of data) {
        let isPristine = true;

        for (let y = element.y; y < (element.y + element.height); y++ ) {
            for (let x = element.x; x < (element.x + element.width); x++) {
                if (grid[y][x] === 'X') {
                    isPristine = false;
                    break;
                }
                // console.log(grid);
            }

            if (!isPristine) break;
        }

        if (isPristine) {
            pristineElement = element;
            break;
        }
    }

    return pristineElement;
}

(async () => {
    try {
        console.time('Get Data');
        const data = await getTestData('testdata.txt');
        console.timeEnd('Get Data');

        console.time('format');
        const formatted = formatData(data);
        console.timeEnd('format');
        
        console.time('solution1');
        console.time('build');
        const grid = await buildCoordinatesMap(formatted);
        console.timeEnd('build');

        console.time('find');
        const product = await filterCrosses(grid);
        console.timeEnd('find');
        console.timeEnd('solution1');

        console.time('solution 2');
        const pristineClaim = await findPristineClaim(formatted, grid);
        console.timeEnd('solution 2');
        
        console.log(`\x1b[44m\x1b[37mTotal square inches of overlap fabric: \x1b[4m${product}\x1b[0m`);
        console.log(`\x1b[44m\x1b[37mPristine Element Id: \x1b[4m${pristineClaim.id}\x1b[0m`);

    } catch (e) {
        console.log(e);
    }
})();