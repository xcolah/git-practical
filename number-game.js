const minNumber = 0;
const maxNumber = 100;
let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
let guessCount = 0;

const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const guessResult = document.getElementById('guess-result');

guessButton.addEventListener('click', () => {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        guessResult.textContent = 'Please enter a valid number.';
    } else if (guess < minNumber || guess > maxNumber) {
        guessResult.textContent = `Please enter a number between ${minNumber} and ${maxNumber}.`;
    } else if (guess < randomNumber) {
        guessResult.textContent = 'Too low!';
        guessCount++;
    } else if (guess > randomNumber) {
        guessResult.textContent = 'Too high!';
        guessCount++;
    } else {
        guessCount++;
        guessResult.textContent = `Congratulations! You guessed the number ${randomNumber} in ${guessCount} tries.`;
        guessInput.disabled = true;
        guessButton.disabled = true;
    }
});
