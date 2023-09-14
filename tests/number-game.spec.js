const { test, expect } = require('@playwright/test');

test('Number game wins correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page.locator('#range')).toHaveText('Guess a number between 0 and 100:');

    const maxTries = 10;
    let guess = 0;
    let numberOfTries = 0;
    let result = await page.locator('#guess-result').textContent();
    while (!result.includes('Congratulations') && numberOfTries < maxTries) {
        const rangeText = await page.locator('#range').textContent();
        const regex = /Guess a number between ([0-9]+) and ([0-9]+)/;
        const [_, min, max] = regex.exec(rangeText);

        guess = Math.round((+max + +min) / 2);
        await page.locator('#guess-input').fill(guess + '');
        await page.locator('#guess-button').click();

        result = await page.locator('#guess-result').textContent();
        numberOfTries += 1;
    }

    await expect(page.locator('#guess-result')).toHaveText(
        `Congratulations! You guessed the number ${guess} in ${numberOfTries} tries.`,
    );
});
