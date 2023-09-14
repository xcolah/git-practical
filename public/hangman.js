// set up the hangman game
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];
const maxGuesses = 6;
let word = words[Math.floor(Math.random() * words.length)];
let guessedLetters = new Set();
let guessesRemaining = maxGuesses;

const wordDisplay = document.getElementById('word-display');
const guessesRemainingText = document.getElementById('guesses-remaining');
const keyboard = document.getElementById('keyboard');

// HINT
const guessResult = document.getElementById('guess-result');

// initialize the word display with underscores for each letter in the word
let displayText = '';
for (let i = 0; i < word.length; i++) {
    displayText += '_ ';
}
wordDisplay.textContent = displayText.trim();

// update the guesses remaining display
guessesRemainingText.textContent = `Guesses remaining: ${guessesRemaining}`;

// enable the buttons for the letters that have not been guessed yet
const enableButtons = () => {
    const buttons = keyboard.querySelectorAll('.key');
    buttons.forEach((letterButton) => {
        if (!guessedLetters.has(letterButton.textContent)) {
            letterButton.disabled = false;
        }
    });
};

const disableButtons = () => {
    const buttons = keyboard.querySelectorAll('.key');
    buttons.forEach((letterButton) => {
        if (!guessedLetters.has(letterButton.textContent)) {
            letterButton.disabled = true;
        }
    });
};

const disableButton = (letter) => {
    const button = keyboard.querySelector(`.key[value="${letter}"]`);
    button.disabled = true;
};

// update the keyboard display
const updateKeyboard = () => {
    const buttons = keyboard.querySelectorAll('.key');
    buttons.forEach((letterButton) => {
        if (guessedLetters.has(letterButton.textContent)) {
            letterButton.classList.add('guessed');
        } else {
            letterButton.classList.remove('guessed');
        }
    });
};

const processGuess = (guess) => {
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
                disableButtons();
            }
        } else {
            // the guess was incorrect
            guessesRemaining--;
            guessesRemainingText.textContent = `Guesses remaining: ${guessesRemaining}`;
            if (guessesRemaining === 0) {
                guessResult.textContent = `Sorry, you lost. The word was "${word}".`;
                disableButtons();
            } else {
                guessResult.textContent = 'Incorrect guess.';
            }
        }

        disableButton(guess);
        updateKeyboard();
    }
};

// initialize the keyboard display
enableButtons();

// add event listeners to the keyboard buttons
keyboard.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('key')) {
        processGuess(target.textContent);
    }
});
