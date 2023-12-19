const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let max;
let min;
let secretNumber;
let numAttempts;

function checkGuess(num) {
    if (num === secretNumber) {
        console.log('Correct!');
        return true;
    } else if (num > secretNumber) {
        console.log('Too high');
        return false;
    } else {
        console.log('Too low');
        return false;
    }
}

function askGuess() {
    rl.question('What do you think the secret number is? you have ' + numAttempts + ' more attempts ', (answer) => {
        console.log('Do you think the number is ' + answer + '?');
        console.log('The number is...');
        numAttempts--;

        if(checkGuess(Number(answer)) && numAttempts !== 0) {
            console.log('You win!');
            rl.close();
        } else if (numAttempts === 0) {
            console.log("So sad, you lose! the right answer is " + secretNumber);
            rl.close();
        } else {
            askGuess();
        }
    });
}

function askRange() {
    rl.question('What you want to be the lowest number? ', askMinimum);
}

const askMinimum = (minimum) => {
    min = minimum;
    rl.question('What you want to be the highest number? ', askMaximum);
}
const askMaximum = (maximum) => {
    max = maximum;
    console.log("Let's start the game! The number is between " + min + " and " + max);
    secretNumber = randomInRange(Number(min), Number(max));
    askLimit();
}

function askLimit() {
    rl.question('How many attempts do you want to have? ', limit => {
        numAttempts = limit;
        askGuess();
    })
}

askRange();

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
