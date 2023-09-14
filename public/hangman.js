// set up the hangman game
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];

const wordDisplay = document.getElementById('word-display');
const guessesRemainingText = document.getElementById('guesses-remaining');
const keyboard = document.getElementById('keyboard');

// HINT
const gameResult = document.getElementById('hangman-result');

function startGame(word = words[Math.floor(Math.random() * words.length)], maxGuesses = 6) {
    console.log(word);
    let guessedLetters = new Set();
    let guessesRemaining = maxGuesses;

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
            gameResult.textContent = 'You already guessed that letter.';
        } else if (guess.length !== 1) {
            gameResult.textContent = 'Please enter a single letter.';
        } else if (!/[a-z]/.test(guess)) {
            gameResult.textContent = 'Please enter a letter.';
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
                    gameResult.textContent = 'Congratulations, you won!';
                    disableButtons();
                }
            } else {
                // the guess was incorrect
                guessesRemaining--;
                guessesRemainingText.textContent = `Guesses remaining: ${guessesRemaining}`;
                if (guessesRemaining === 0) {
                    gameResult.textContent = `Sorry, you lost. The word was "${word}".`;
                    disableButtons();
                } else {
                    gameResult.textContent = 'Incorrect guess.';
                }
            }

            disableButton(guess);
            updateKeyboard();
        }
    };

    // initialize the keyboard display
    enableButtons();

    // add event listeners to the keyboard buttons
    keyboard.onclick = (event) => {
        const target = event.target;
        if (target.classList.contains('key')) {
            processGuess(target.textContent);
        }
    };

    return word;
}

startGame();
