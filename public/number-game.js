// set up the number guessing game
let minNumber = 0;
let maxNumber = 100;
let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
let guessCount = 0;

const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const gameResult = document.getElementById('guess-result');
const rangeText = document.getElementById('range');

// display the latest min and max range
rangeText.textContent = `Guess a number between ${minNumber} and ${maxNumber}:`;

guessButton.addEventListener('click', () => {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        gameResult.textContent = 'Please enter a valid number.';
    } else if (guess < minNumber || guess > maxNumber) {
        gameResult.textContent = `Please enter a number between ${minNumber} and ${maxNumber}.`;
    } else if (guess < randomNumber) {
        gameResult.textContent = 'Too low!';
        guessCount++;
        minNumber = guess + 1;
    } else if (guess > randomNumber) {
        gameResult.textContent = 'Too high!';
        guessCount++;
        maxNumber = guess - 1;
    } else {
        guessCount++;
        gameResult.textContent = `Congratulations! You guessed the number ${randomNumber} in ${guessCount} tries.`;
        guessInput.disabled = true;
        guessButton.disabled = true;
    }

    // update the latest min and max range
    rangeText.textContent = `Guess a number between ${minNumber} and ${maxNumber}:`;
});
