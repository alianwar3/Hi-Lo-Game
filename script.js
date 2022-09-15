// Display div sections
const enterNameDiv = document.querySelector('.enter-name');
const enterMaxNumDiv = document.querySelector('.max-num');
const enterGuess = document.querySelector('.make-guess');
const congratsMessage = document.querySelector('.congratulations-message');

// Display statements below input box
const displayInfo = document.querySelector('.display-info');
const displayMaxNum = document.querySelector('.display-max-num');
const displayGuess = document.querySelector('.display-guess');
const displayWon = document.querySelector('.display-won');


// Intially show only enter name box
enterNameDiv.style.display = "block";
enterMaxNumDiv.style.display = "none";
enterGuess.style.display = "none";
congratsMessage.style.display = "none";


// 1) Function to validate name inputs
let nameInfo = ''
const inputName = function(event) {
    event.preventDefault();
    nameInfo = document.getElementById("myName").value;
    let charCount = 0

    // Check to see blank spaces in name input
    for(let i = 0; i < nameInfo.length; i++) {
        if (nameInfo[i] == " ") {
            continue;
        }
        else {
            charCount++
        }
    }

    // Check to see if charCount is > 0, if it is proceed to user entering max number
    if (charCount == 0) {
        displayInfo.innerHTML = "Text field blank, please enter your name.";
        displayInfo.style.color = "red";
    } else {
        displayInfo.innerHTML = "";
        enterNameDiv.style.display = "none";
        enterMaxNumDiv.style.display = "block";
    }
}


// 2) Function to take input of max num
let randomNum = 0;
let maxNum = 0;
const highestNumber = 9007199254740991;
const inputMaxNum = function(event) {
    event.preventDefault();
    let maxNumInput = document.getElementById("maxNum").value;

    // Evaluate whether number is a valid number
    let evaluateMaxNum = isNumeric(maxNumInput);

    // Convert string input into an integer
    maxNum = parseInt(maxNumInput)

    // If number is not an integer value, prompt error
    if (evaluateMaxNum == false) {
        displayMaxNum.innerHTML = "Invalid, please enter a valid positive integer value.";
        displayMaxNum.style.color = "red";
    }

    // If number is an integer, however is greater than JavaScript's max safe integer, prompt error
    else if ((evaluateMaxNum == true) && (maxNum > highestNumber) ) {
        displayMaxNum.innerHTML = "Invalid, number exceeds max safe integer 9007199254740991.";
        displayMaxNum.style.color = "red";
    }

    // If number is less than 1, prompt error
    else if (maxNum < 1) {
        displayMaxNum.innerHTML = "Invalid, please enter a number greater than 0.";
        displayMaxNum.style.color = "red";
    }

    // Indicates number is valid, display guess block
    else {
        displayMaxNum.innerHTML = "";
        enterMaxNumDiv.style.display = "none";
        enterGuess.style.display = "block";
    }

    displayGuess.innerHTML = `Your allowable guessing range is any value between 1 and ${maxNum}.`
    randomNum = Math.floor(Math.random() * maxNum) + 1;

    return maxNum;
}


// 3) Function to compare input guess
let currentMin = 1;
let currentMax = 0;
let i = 0;

function inputGuess(event){
    event.preventDefault();

    // Selecting the input element and get its value
    let inputVal = document.getElementById("myInput").value;
    let guess = parseInt(inputVal);

    // Evaluate if integer value is greater than 1 or is not a valid integer value
    if (guess < 1 || isNaN(guess)) {
        displayGuess.innerHTML = "Please enter an integer value greater than 1 or a valid integer value."
        displayGuess.style.color = "red";
        return 0;
    }

    // Intial set currentMax to maxNum
    while (i == 0) {
        currentMax = maxNum;
        i += 1;
    }

    // Find highest value in minRange
    if (guess < randomNum) {
        if (guess > currentMin) {
            currentMin = guess;
        }
    }

    // Highest value in minRange which is lower than the guess
    else if (guess > randomNum) {
        if (guess < currentMax) {
            currentMax = guess;
        }
    }

    // Display allowable range
    displayGuess.innerHTML = `Your allowable guessing range is any value between ${currentMin} and ${currentMax}.`
    displayGuess.style.color = "black";

    if (guess == randomNum) {
        enterNameDiv.style.display = `none`;
        enterMaxNumDiv.style.display = `none`;
        enterGuess.style.display = "none";
        congratsMessage.style.display = "block";
        displayWon.innerHTML = `Congratulations ${nameInfo}, You Guessed the Correct Number -> ${randomNum}.`;
        document.body.style.backgroundColor = `cyan`;
    }

    // console.log('randonNum:', randomNum)
    // console.log('currentMin:', currentMin, 'currentMax:', currentMax);
}


// 4) Evaluate if max num or guess is a valid integer
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}


// 5) Function to refresh page
function refreshPage(){
    window.location.reload();
}
