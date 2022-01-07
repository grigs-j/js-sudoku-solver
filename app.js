const puzzleBoard = document.getElementById("puzzle-board");
const solveBtn = document.getElementById("solve-btn");
//sudoku board is 9x9 squares
const squares = 81;
let submittedInputs = [];
const solutionText = document.getElementById("solution-text");

//looping over squares to make board and setting input attributes
for (let i = 0; i < squares; i++) {
    const inputEl = document.createElement("input");
    inputEl.setAttribute("type", "number");
    inputEl.setAttribute("min", "1");
    inputEl.setAttribute("max", "9");

    //setting up dark squares of board
    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
        inputEl.classList.add("odd-section");
    }

    puzzleBoard.appendChild(inputEl);
}

function joinValues() {
    const inputsGrouped = document.querySelectorAll("input");
    inputsGrouped.forEach((input) => {
        //if input has a value push into subtmitted array
        if (input.value) {
            submittedInputs.push(input.value);
        } else {
            //otherwise push dot representing an empty square
            //returns string
            submittedInputs.push(".");
        }
    });
}

//getting info from post res
function populateValues(isSolvable, solution) {
    const inputs = document.querySelectorAll("input");
    //is each is true, then populate board
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            //while looping thru stack, assign each iteration to that solution value
            input.value = solution[i];

            solutionText.innerHTML = "This is the answer! Good work!";
        });
    } else {
        solutionText.innerHTML = "This is puzzle isn't solvable";
    }
}

function solve() {
    joinValues();
    //join method changes string back to array before post req
    const data = { numbers: submittedInputs.join("") };
    console.log("data", data);

    fetch("http://localhost:8000/solve", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            populateValues(data.solvable, data.solution);
            submittedInputs = [];
        })

        .catch(function (error) {
            console.error(error);
        });
}

solveBtn.addEventListener("click", solve);
