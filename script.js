const calcContainer = document.querySelector("#calc-container");
const themeToggle = document.getElementById('theme-toggle');
const buttonContainer = document.getElementById('button-container');
const historyContainer = document.getElementById('history-dp');
const resultContainer = document.getElementById('result-dp');
resultContainer.textContent = '0';

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

document.addEventListener('keypress', (event) => {
    var currentKey = event.key;
    
    if(currentKey === 'Backspace' || currentKey === 'C' || currentKey === 'c') userInteraction('C');

    else if(parseFloat(currentKey) || currentKey === '0') userInteraction(currentKey);

    else if(currentKey === 'Enter') userInteraction('=');

    else userInteraction(currentKey);

  }, false);

const buttonItems = document.querySelectorAll('.button-item');
buttonItems.forEach((button) => {
   button.addEventListener('click', () => {
        userInteraction(button.textContent);
    })
});

function userInteraction(input){
    if(!isNaN(parseFloat(input))){
        if((parseFloat(resultContainer.textContent) === 0 && !resultContainer.textContent.includes('.'))
            || (resultContainer.textContent === Infinity || resultContainer.textContent === NaN))
            resultContainer.textContent = '';
        resultContainer.textContent += input;
   }
   else if(input.includes('%')){
        historyContainer.textContent = resultContainer.textContent + " / 100 =";
        resultContainer.textContent = evalResult(historyContainer.textContent);
    }

   else if(input === '.' && !resultContainer.textContent.includes('.')){
        resultContainer.textContent += input;
   }

   else if(input === '=' &&
          (historyContainer.textContent.includes('+') || historyContainer.textContent.includes('-')
        || historyContainer.textContent.includes('x') || historyContainer.textContent.includes('/'))){
        if(!historyContainer.textContent.includes('=')){
            if(!(historyContainer.textContent.includes('/') && resultContainer.textContent === '0')){
                historyContainer.textContent += resultContainer.textContent + ` ${input} `;
                resultContainer.textContent = evalResult(historyContainer.textContent);
            }
            else alert('You can not divide by zero!');
       }
   } 

   else if(input === 'AC'){ 
        historyContainer.textContent = '';
        resultContainer.textContent = '0';
   }

   else if(input === 'C'){
    if(resultContainer.textContent != '0')
       resultContainer.textContent = resultContainer.textContent.slice(0, -1);
    if(resultContainer.textContent === '') resultContainer.textContent = '0';
   }

   else if (input === '+' || input === '-' || input === 'x' || input === '/'){
        if( (!historyContainer.textContent.includes('+') && !historyContainer.textContent.includes('-')
            && !historyContainer.textContent.includes('x') && !historyContainer.textContent.includes('/'))){

            historyContainer.textContent = resultContainer.textContent + ` ${input} `;   
            resultContainer.textContent = '0';
            }
        else if(historyContainer.textContent.endsWith(' / ') || historyContainer.textContent.endsWith(' + ')
                || historyContainer.textContent.endsWith(' - ') || historyContainer.textContent.endsWith(' x '))
                historyContainer.textContent = historyContainer.textContent.slice(0, -3) + ` ${input} `;
        else if(historyContainer.textContent.endsWith(' / ') && input === '/'
                && resultContainer.textContent === '0')
            alert('You can not divide by zero!');

        else if(!historyContainer.textContent.includes('=')){
            historyContainer.textContent = evalResult(historyContainer.textContent + resultContainer.textContent) 
                                                      + ` ${input} `;
                                        
            resultContainer.textContent = '0';
        }
        
        else{
            historyContainer.textContent = resultContainer.textContent + ` ${input} `;
                                        
            resultContainer.textContent = '0';
        }
    }
    else if(input === '+/-'){
        if(!(resultContainer.textContent === '0')){
            if(parseFloat(resultContainer.textContent) <= 0 ){
                resultContainer.textContent = resultContainer.textContent.slice(1);
            }
            else resultContainer.textContent = '-' + resultContainer.textContent;
        }
    }
}

function evalResult(operation){
    const elements = operation.split(" ");
    if(elements[1] === '+') return parseFloat(elements[0]) + parseFloat(elements[2]);
    else if(elements[1] === '-') return  parseFloat(elements[0]) - parseFloat(elements[2]);
    else if(elements[1] === 'x') return  parseFloat(elements[0]) * parseFloat(elements[2]);
    else if(elements[1] === '/') return parseFloat(elements[0]) / parseFloat(elements[2]);
}

themeToggle.onclick = () =>{ 
    themeToggle.classList.toggle('light');
    calcContainer.classList.toggle('light');
    buttonContainer.classList.toggle('light');
    historyContainer.classList.toggle('light');
    resultContainer.classList.toggle('light');
    document.querySelectorAll('.button-item').forEach(function(el){
        el.classList.toggle('light');
    });
} 