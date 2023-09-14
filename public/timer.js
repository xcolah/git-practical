// update the timer every second
setInterval(() => {
    // get the current time in the format of HH:mm:ss
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // set the text of the timer element to the current time
    document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);
