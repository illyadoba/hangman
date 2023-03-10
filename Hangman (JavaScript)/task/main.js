// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

console.log("H A N G M A N\n");
const dictionary = ["python", "java", "swift", "javascript"];

let win = 0;
let lose = 0;

while (true) {
    switch (input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `)) {
        case "play":
            game() ? ++win : ++lose;
            break;
        case "results":
            console.log(`You won: ${win} times.\nYou lost: ${lose} times.\n`);
            break;
        case "exit":
            return;
    }
}

function getRandomWord(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

function game() {
    let secret = Array.from(getRandomWord(dictionary));
    let hint = new Array(secret.length).fill('-', 0, secret.length);

    let mistakes = 8;
    let contains = [];

    while (mistakes) {
        console.log(hint.join(""));
        let ch = input("Input a letter: ");
        if (ch.length !== 1) {
            console.log("Please, input a single letter.");
        } else {
            if (ch.charCodeAt(0) > 96 && ch.charCodeAt(0) < 123) {
                if (secret.includes(ch) && !hint.includes(ch)) {
                    for (let j = 0; j < secret.length; j++) {
                        if (secret[j] === ch) {
                            hint[j] = ch;
                        }
                    }
                    if (!hint.includes('-')) break;
                } else {
                    if (contains.includes(ch)) {
                        console.log("You've already guessed this letter.");
                    } else {
                        console.log("That letter doesn't appear in the word.");
                        --mistakes;
                    }
                }
            } else {
                console.log("Please, enter a lowercase letter from the English alphabet.");
            }
        }
        contains.push(ch);
    }
    console.log(mistakes ? `You guessed the word ${hint.join("")}!\nYou survived!` : "You lost!");
    return mistakes;
}