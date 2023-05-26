const ff = document.getElementById("1-1");
const fs = document.getElementById("1-2");
const ft = document.getElementById("1-3");
const sf = document.getElementById("2-1");
const ss = document.getElementById("2-2");
const st = document.getElementById("2-3");
const tf = document.getElementById("3-1");
const ts = document.getElementById("3-2");
const tt = document.getElementById("3-3");

const message = document.getElementById("message");

const allButtons = [ff, fs, ft, sf, ss, st, tf, ts, tt];

const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const playerCells = [];
const aiCells = [];

const checkEnding = () => {
    for (let i = 0; i < winningPatterns.length; i++) {
        let patternToCheck = winningPatterns[i];

        patternToCheck = patternToCheck.replace('[', '');
        patternToCheck = patternToCheck.replace(']', '');

        if (playerCells.includes(patternToCheck)) {
            message.innerHTML = "Hai vinto!";
        } else if (aiCells.includes(patternToCheck)) {
            message.innerHTML = "Hai perso!";
        }
    }
}

const computerSelect = () => {
    const selected = false;

    while (selected === false) {
        const randomInt = Math.floor(Math.random() * 8);
        const randomCell = allButtons[randomInt];

        if (randomCell.classList.contains("playerSelected") == false) {
            // checkEnding();
            randomCell.innerHTML = "O";
            randomCell.classList.add("aiSelected");

            aiCells.push(randomInt);

            selected = true;
        }
    }
}

for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", () => {
        // checkEnding();

        allButtons[i].classList.add("playerSelected");
        allButtons[i].innerHTML = "X";

        playerCells.push(i);
        message.innerHTML = playerCells;

        computerSelect();
    })
}