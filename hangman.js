// set up the hangman game
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];
const maxGuesses = 6;
let word = words[Math.floor(Math.random() * words.length)];
let guessedLetters = new Set();
let guessesRemaining = maxGuesses;

const wordDisplay = document.getElementById('word-display');
const guessesRemainingText = document.getElementById('guesses-remaining');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const guessResult = document.getElementById('guess-result');

// initialize the word display with underscores for each letter in the word
let displayText = '';
for (let i = 0; i < word.length; i++) {
    displayText += '_ ';
}
wordDisplay.textContent = displayText.trim();

// update the guesses remaining display
guessesRemainingText.textContent = `Guesses remaining: ${guessesRemaining}`;

guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();

    if (guessedLetters.has(guess)) {
        guessResult.textContent = 'You already guessed that letter.';
    } else if (guess.length !== 1) {
        guessResult.textContent = 'Please enter a single letter.';
    } else if (!/[a-z]/.test(guess)) {
        guessResult.textContent = 'Please enter a letter.';
    } else {
        guessedLetters.add(guess);

        if (word.includes(guess)) {
            // the guess was correct
            let displayArray = wordDisplay.textContent.split(' ');
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    displayArray[i] = guess;
                }
            }
            wordDisplay.textContent = displayArray.join(' ');
            if (!wordDisplay.textContent.includes('_')) {
                guessResult.textContent = 'Congratulations, you won!';
                guessInput.disabled = true;
                guessButton.disabled = true;
            }
        } else {
            // the guess was incorrect
            guessesRemaining--;
            if (guessesRemaining === 0) {
                guessResult.textContent = `Sorry, you lost. The word was "${word}".`;
                guessInput.disabled = true;
                guessButton.disabled = true;
            } else {
                guessResult.textContent = 'Incorrect guess.';
                guessesRemainingText.textContent = `Guesses remaining: ${guessesRemaining}`;
            }
        }
    }

    guessInput.value = '';
    guessInput.focus();
});
