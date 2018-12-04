const { getTestData } = require('../utilities');

async function parseGuardLog(events) {
    let guards = {};
    let activeGuard = null;

    for (let event of events) {
        if (event.log.includes('falls asleep')) {
            if (!guards[activeGuard]) guards[activeGuard] = [];

            guards[activeGuard].push({
                id: activeGuard.substring(1),
                minute: event.timestamp.getMinutes(),
                isAsleep: true
            });
        } else if (event.log.includes('wakes up')) {
            if (!guards[activeGuard]) guards[activeGuard] = [];

            guards[activeGuard].push({
                id: activeGuard.substring(1),
                minute: event.timestamp.getMinutes(),
                isAsleep: false
            });
        } else {
            activeGuard = event.log.split(' ')[1];
        }
    }

    return guards;
}

async function formatData(data) {
    let events = [];

    for (let item of data) {
        let timestamps = item.trim().split(']');
        events.push({
            timestamp: new Date(timestamps[0].substring(1, timestamps[0].length)),
            log: timestamps[1].substring(1, timestamps[1].length)
        });
    }

    let sortedEvents = events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    let guardEvents = await parseGuardLog(sortedEvents);
    
    for (let key of Object.keys(guardEvents)) {
        guardEvents[key] = guardEvents[key].sort((a, b) => a.minute - b.minute);
    }

    return guardEvents;
};

function findBestGuard(data) {
    let bestGuard = null;

    for (let guard of Object.keys(data)) {
        let counts = new Map();
        let isAsleepCount = data[guard].filter((log) => log.isAsleep == true);
    
        isAsleepCount.forEach((count) => {
            if (!counts.has(count.minute)) {
                counts.set(count.minute, 1);
            } else {
                let occurence = counts.get(count.minute);

                counts.set(count.minute, occurence + 1);
            }
        });

        let tempBest = Array.from(counts).reduce((max, element) => element[1] > max[1] ? element : max);
        
        if (!bestGuard) {
            bestGuard = {
                id: data[guard][0].id,
                count: tempBest[0]
            };
        } else if (tempBest[1] > bestGuard.count) {
            bestGuard = {
                id: data[guard][0].id,
                count: tempBest[0]
            };
        }
    }
    
    return bestGuard;
}

(async () => {
    try {
        console.time('Get Data');
        const data = await getTestData('testdata.txt');
        console.timeEnd('Get Data');

        console.time('format');
        const formatted = await formatData(data);
        console.timeEnd('format');
        
        console.time('solution1');
        const bestGuard = findBestGuard(formatted);
        console.timeEnd('solution1');

        console.time('solution 2');
        console.timeEnd('solution 2');
        
        console.log(`\x1b[44m\x1b[37mBest guard id and minute: \x1b[4m${bestGuard.id} ${bestGuard.count} solution: ${bestGuard.id * bestGuard.count}\x1b[0m`);
        console.log(`\x1b[44m\x1b[37mPristine Element Id: \x1b[4m${'Not implemented'}\x1b[0m`);

    } catch (e) {
        console.log(e);
    }
})();