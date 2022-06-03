const calcContainer = document.querySelector("#calc-container");
const themeToggle = document.getElementById('theme-toggle');
const buttonContainer = document.getElementById('button-container');

const buttonContents = ['AC', 'C', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '+/-', '.', '='];

function makeRows(rows, cols) {
    buttonContainer.style.setProperty('--grid-rows', rows);
    buttonContainer.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        buttonContainer.appendChild(cell).className = "button-item";
        cell.textContent = buttonContents[c];
    }
}

makeRows(5,4);

themeToggle.onclick = () =>{ 
    themeToggle.classList.toggle('light');
    calcContainer.classList.toggle('light');
    buttonContainer.classList.toggle('light');
    document.querySelectorAll('.button-item').forEach(function(el){
        el.classList.toggle('light');
    });
}