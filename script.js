const style = getComputedStyle(document.body);

const cells = document.getElementsByClassName("cells");
const message = document.getElementById("message");
const turnIndicator = document.getElementById("turnIndicator");

const onePlayer = document.getElementById("onePlayer");
const twoPlayers = document.getElementById("twoPlayers");
const playerColorInput = document.getElementById("playerColor");
const aiColorInput = document.getElementById("aiColor");
const noAnimations = document.getElementById("noAnimations");
const yesAnimations = document.getElementById("yesAnimations");

let matchEnded = false;
let turn = 0; // 0: player's turn, 1: ai's turn

let players = 1; // 1: use ai, 2: don't use ai
let playerColor = style.getPropertyValue('--red');
let aiColor = style.getPropertyValue('--blue');
let animations = true;

let playerArray = [];
let aiArray = [];

const updateColorSettings = () => {
    playerColorInput.value = playerColor;
    aiColorInput.value = aiColor;
}
updateColorSettings();

// Changes turn indicator based on "turn" value
const updateTurn = () => {
    if (turn === 0) {
        turnIndicator.innerHTML = `
        <h2>
        <i class="fa-solid fa-circle fa-bounce" id="turnIcon"></i>
        Your turn!
        </h2>`;
        const turnIcon = document.getElementById("turnIcon");
        turnIcon.style.color = style.getPropertyValue('--red');
        turnIcon.style.opacity = '1';
    } else {
        turnIndicator.innerHTML = `
        <h2>
        <i class="fa-solid fa-circle" id="turnIcon"></i>
        AI turn!
        </h2>`;
        const turnIcon = document.getElementById("turnIcon");
        turnIcon.style.color = style.getPropertyValue('--blue');
        turnIcon.style.opacity = '0.5';
    }
}
updateTurn();

/* Bad way of checking if the match ended, but it works :) */
const checkEnding = () => {
    let playerContainsZero = playerArray.includes("0");
    let playerContainsOne = playerArray.includes("1");
    let playerContainsTwo = playerArray.includes("2");
    let playerContainsThree = playerArray.includes("3");
    let playerContainsFour = playerArray.includes("4");
    let playerContainsFive = playerArray.includes("5");
    let playerContainsSix = playerArray.includes("6");
    let playerContainsSeven = playerArray.includes("7");
    let playerContainsEight = playerArray.includes("8");

    if (
        ( playerContainsZero && playerContainsOne && playerContainsTwo ) ||
        ( playerContainsThree && playerContainsFour && playerContainsFive) ||
        ( playerContainsSix && playerContainsSeven && playerContainsEight) ||
        ( playerContainsZero && playerContainsThree && playerContainsSix) ||
        ( playerContainsOne && playerContainsFour && playerContainsSeven) ||
        ( playerContainsTwo && playerContainsFive && playerContainsEight) ||
        ( playerContainsZero &&  playerContainsFour && playerContainsEight) ||
        ( playerContainsTwo && playerContainsFour && playerContainsSix)
    ) {
        turnIndicator.style.display = 'none';
        message.innerHTML = "<h2>Player won!</h2>";
        message.style.color = style.getPropertyValue("--red");
        matchEnded = true;
    }


    let aiContainsZero = aiArray.includes(0);
    let aiContainsOne = aiArray.includes(1);
    let aiContainsTwo = aiArray.includes(2);
    let aiContainsThree = aiArray.includes(3);
    let aiContainsFour = aiArray.includes(4);
    let aiContainsFive = aiArray.includes(5);
    let aiContainsSix = aiArray.includes(6);
    let aiContainsSeven = aiArray.includes(7);
    let aiContainsEight = aiArray.includes(8);

    console.log(aiContainsZero);

    if (
        ( aiContainsZero && aiContainsOne && aiContainsTwo) ||
        ( aiContainsThree && aiContainsFour && aiContainsFive) ||
        ( aiContainsSix && aiContainsSeven && aiContainsEight) ||
        ( aiContainsZero && aiContainsThree && aiContainsSix) ||
        ( aiContainsOne && aiContainsFour && aiContainsSeven) ||
        ( aiContainsTwo && aiContainsFive && aiContainsEight) ||
        ( aiContainsZero && aiContainsFour && aiContainsEight) ||
        ( aiContainsTwo && aiContainsFour && aiContainsSix)
    ) {
        turnIndicator.style.display = 'none';
        message.innerHTML = "<h2>AI won!</h2>";
        message.style.color = style.getPropertyValue("--blue");
        matchEnded = true;
    }
}

/* Function for making the AI select a cell.
Includes a failsafe against infinite loops and checks if the selected cell wasn't already
selected by the player or the AI itself. */

const aiSelect = () => {
    let selected = false;
    let tests = 0;  // failsafe against infinite loop

    while (selected === false) {
        if (tests <= 9) {
            let randomInt = Math.floor(Math.random() * 8);
            let selectedCell = document.getElementById(randomInt);

            if ((!selectedCell.classList.contains("playerSelected")) && (!selectedCell.classList.contains("aiSelected"))) {
                selectedCell.classList.add("aiSelected");
                selectedCell.innerHTML = "O";
                
                console.log(`✅ Cell ${randomInt} selected!`);
                
                aiArray.push(randomInt);

                checkEnding();

                turn = 0;
                updateTurn();

                console.log(`AI Array: ${aiArray}`);

                selected = true;
                tests = 0;
            } else {
                console.log(`❌ Tried cell ${randomInt}`);
                tests++;
            }

        } else {
            console.log(`⚠️ Tried more than 9 times. Match is probably finished.`);
            console.log(`✅ Changed "selected" to true to end infinite loop.`)
            selected = true;
        }
    }
 }


// Assigns an unique id (from 0 to 8) to each cell
const initializeGame = () => {
    let i = 0;

    for (const cell of cells) {
        cell.setAttribute("id", i);

        cell.addEventListener("click", () => {
            if ((!cell.classList.contains("playerSelected")) && (!cell.classList.contains("aiSelected"))) {
                if (!matchEnded) {
                    cell.innerHTML = "X";
                    cell.classList.add("playerSelected");
                    playerArray.push(cell.id);

                    turn = 1;
                    updateTurn();
                    
                    checkEnding();
                    aiSelect();
                } else {
                    console.log(`❌ Match is already finished!`);
                }
            } else {
                console.log(`❌ Cell ${cell.id} was already selected!`);
            }
        });

        i++;
    }
}
initializeGame();