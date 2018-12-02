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
 * 
 * Okay I'm on to something. Size of each array is 8*x where x is number of layers away from the center
 * center array 1x1 grid, element at index 0 (8x0) size of 1. 
 * First outter shell 3x3 grid, 9 total elements - 1 previous element = 8 new elements. 
 * Second outter shell 5x5 grid, 25 total elements - 9 previous = 16 new elements.
 * third outter shell 7x7 grid, 49 total element - 25 previous = 24 new elements.
 * fourth outter shell 9x9 grid, 81 total elements - 49 previous = 32 new elements. 
 * fifth outter shell 11x11 grid, 121 total elements - 81 previous = 40 new elements. 
 * nth outer shell yxy grid, p total elements - q previous = r new elements.
 * 
 * Okay I can build an array. How the F do I calculate corners. 
 */

