// @ts-check
const { test, expect } = require('@playwright/test');

test('hangman game completes successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const word = await page.evaluate(() => window.startGame('donkey'));

    for (let i = 0; i < word.length; i++) {
        const character = word[i];
        await expect(page.locator('.key').getByText(character)).not.toBeDisabled();
        await page.locator('.key').getByText(character).click();
        await expect(page.locator('.key').getByText(character)).toBeDisabled();
        await expect(page.locator('#guesses-remaining')).toHaveText(`Guesses remaining: 6`);
    }

    await expect(page.locator('#hangman-result')).toHaveText('Congratulations, you won!');
});

test('hangman game detects wrong guesses and still completes successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const guessCount = 6;
    const word = await page.evaluate(() => window.startGame('donkey', 6));

    async function clickKeyboard(character, guessRemainingText) {
        await expect(page.locator('.key').getByText(character)).not.toBeDisabled();
        await page.locator('.key').getByText(character).click();
        await expect(page.locator('.key').getByText(character)).toBeDisabled();
        await expect(page.locator('#guesses-remaining')).toHaveText(guessRemainingText);
    }

    const part1 = word.slice(0, 3);
    for (let i = 0; i < part1.length; i++) {
        const character = part1[i];
        await clickKeyboard(character, `Guesses remaining: ${guessCount}`);
    }

    const partWrong = 'abc';
    for (let i = 0; i < partWrong.length; i++) {
        const character = partWrong[i];
        await clickKeyboard(character, `Guesses remaining: ${guessCount - i - 1}`);
    }

    const part2 = word.slice(3);
    for (let i = 0; i < part2.length; i++) {
        const character = part2[i];
        await clickKeyboard(character, `Guesses remaining: ${guessCount - partWrong.length}`);
    }

    await expect(page.locator('#hangman-result')).toHaveText('Congratulations, you won!');
});
