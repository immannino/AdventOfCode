/**
 * Part 1: Complete. (at least for the number they provided, this code is terrible but I just wanted to solve the puzzle.)
 */
let dataLocation = 361527;

var isEven = (num) => num % 2;
var calculateNegativeSquare = (num) => isEven(num) ? num : num + 1;
var rightCornerFunction = (num) => calculateNegativeSquare(Math.round(Math.sqrt(num)));
var distanceToMiddleOfGrid = (num) => Math.floor(num / 2);
var distanceToMiddleOfGridHappyPath = (num) => Math.floor(num / 2) * 2;
var isCornerEqualToNumber = (num, corner) => num === Math.pow(corner, 2);
var isCornerLessThanNumber = (num, corner) => num < Math.pow(corner, 2);
var isRightCloserThanTop = (rightMiddle, topMiddle, num) => Math.abs((rightMiddle - num)) < Math.abs((topMiddle - num));
var isBottomCloserThanLeft = (bottomMiddle, leftMiddle, num) => Math.abs((bottomMiddle - num)) < Math.abs((leftMiddle - num));
var steps = 0;
let stepsFromNumber = 0;
let stepsFromMiddle = 0;
let rightCorner = rightCornerFunction(dataLocation);

if (isCornerEqualToNumber(dataLocation, rightCorner)) {
    steps = distanceToMiddleOfGridHappyPath(rightCorner);
} else if (isCornerLessThanNumber(dataLocation, rightCorner)) {
    stepsFromNumber = Math.pow(rightCorner, 2) - dataLocation;
    let bottomMiddle = Math.pow(rightCorner, 2) - distanceToMiddleOfGrid(rightCorner);
    let leftMiddle =  Math.pow(rightCorner, 2) - (distanceToMiddleOfGrid(rightCorner) * 3);
    
    if (isBottomCloserThanLeft(bottomMiddle, leftMiddle, dataLocation)) {
        stepsFromMiddle = Math.abs(dataLocation - bottomMiddle);
        steps = distanceToMiddleOfGrid(rightCorner) + stepsFromMiddle;
    } else {
        stepsFromMiddle = Math.abs(dataLocation - leftMiddle);
        steps = distanceToMiddleOfGrid(rightCorner) + stepsFromMiddle;
    }
} else {
    stepsFromNumber = dataLocation - Math.pow(rightCorner, 2) ;
    let rightMiddle = Math.pow(rightCorner, 2) + distanceToMiddleOfGrid(rightCorner);
    let topMiddle =  Math.pow(rightCorner, 2) + (distanceToMiddleOfGrid(rightCorner) * 3);

    if (isRightCloserThanTop(rightMiddle, topMiddle, dataLocation)) {
        stepsFromMiddle = Math.abs(dataLocation - rightMiddle);
        steps = distanceToMiddleOfGrid(rightCorner) + stepsFromMiddle;
    } else {
        stepsFromMiddle = Math.abs(dataLocation - topMiddle);
        steps = distanceToMiddleOfGrid(rightCorner) + stepsFromMiddle;
    }
}

console.log(steps);

/**
 * Step 2: What.
 */