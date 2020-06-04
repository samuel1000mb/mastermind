let secretNumber = "";
let playerNumber = "";

let previousAttempts = [];
let counter = 0;

let gameover = false;

let currentScoreRow = null;

function StartGame() {
    gameover = false;
    ClearTables();
    ClearPlayerInput();
    Generate4DigitNumber();
    console.log(secretNumber);
}

function ClearTables() {
    let table = document.getElementById("scoreTabel");
    table.innerHTML = '';
    table = document.getElementById("vorigePogingenTabel");
    table.innerHTML = '';
}

function Play() {
    // also check if all fields are filled in
    if (gameover == false) {
        SavePlayerNumber();
        AddPlayerNumberToPreviousAttempts();

        CheckPlayerDigits();
    }

    if (secretNumber == playerNumber) {
        ShowMessage("proficiat");
    }
    else if (previousAttempts.length >= 10) {
        gameover = true;
        ShowMessage("Game Over");
    }
    else {
        ClearPlayerInput();
    }
}

function CheckPlayerDigits() {
    let table = document.getElementById("scoreTabel");
    currentScoreRow = table.insertRow(-1);

    while(counter < 4) {
        CheckNextDigitOfPlayerNumber();
    }
    counter = 0;
}

function SavePlayerNumber() {
    playerNumber = document.getElementById("digit1").value;
    playerNumber += document.getElementById("digit2").value;
    playerNumber += document.getElementById("digit3").value;
    playerNumber += document.getElementById("digit4").value;
}

function Generate4DigitNumber() {
    secretNumber = Math.floor(1000 + Math.random() * 9000).toString();
}

function AddPlayerNumberToPreviousAttempts() {
    previousAttempts.push(playerNumber);

    let table = document.getElementById("vorigePogingenTabel");
    let row = table.insertRow(-1);

    for (let i = 0; i < playerNumber.length; ++i) {
        let cell = row.insertCell(-1);
        cell.innerHTML = playerNumber[i];
    }
    console.log(secretNumber);
}

function CheckNextDigitOfPlayerNumber() {
    if (playerNumber[counter] == secretNumber[counter]) {
        AddDot("green");
    }
    else if (secretNumber.includes(playerNumber[counter])) {
        AddDot("red");
    }
    else {
        AddDot("grey");
    }

    counter++;
}

function AddDot(color) {
    let cell = currentScoreRow.insertCell(-1);
    if (color == "red") {
        cell.innerHTML = '<div class="dot redDot"></div>';
    }
    else if (color == "green") {
        cell.innerHTML = '<div class="dot greenDot"></div>';
    }
    else {
        cell.innerHTML = '<div class="dot greyDot"></div>';
    }
}

function ShowMessage(msg) {
    document.getElementById("bericht").innerHTML = msg;
}

function ClearPlayerInput() {
    document.getElementById("digit1").value = '';
    document.getElementById("digit2").value = '';
    document.getElementById("digit3").value = '';
    document.getElementById("digit4").value = '';
}