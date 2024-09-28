module.exports = {
    greeting: (name) => `<p style="color: blue;">Hello, ${name || 'Guest'}! What a beautiful day.</p>`,
    serverTime: (time) => `<p style="color: blue;">Server current date and time is: ${time}</p>`
};