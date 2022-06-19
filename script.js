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
const buttonItems = document.querySelectorAll('.button-item');
buttonItems.forEach((button) => {
   button.addEventListener('click', () => {

   if(!isNaN(parseFloat(button.textContent))){
        if((parseFloat(resultContainer.textContent) === 0 && !resultContainer.textContent.includes('.'))
            || (resultContainer.textContent === Infinity || resultContainer.textContent === NaN))
            resultContainer.textContent = '';
        resultContainer.textContent += button.textContent;
   }
   else if(button.textContent.includes('%')){
        alert('lefut');
        historyContainer.textContent = resultContainer.textContent + " / 100 =";
        resultContainer.textContent = evalResult(historyContainer.textContent);
    }

   else if(button.textContent === '.' && !resultContainer.textContent.includes('.')){
        resultContainer.textContent += button.textContent;
   }

   else if(button.textContent === '=' &&
          (historyContainer.textContent.includes('+') || historyContainer.textContent.includes('-')
        || historyContainer.textContent.includes('x') || historyContainer.textContent.includes('/'))){
        if(!historyContainer.textContent.includes('=')){
            if(!(historyContainer.textContent.includes('/') && resultContainer.textContent === '0')){
                historyContainer.textContent += resultContainer.textContent + ` ${button.textContent} `;
                resultContainer.textContent = evalResult(historyContainer.textContent);
            }
            else alert('You can not divide by zero!');
       }
   } 

   else if(button.textContent === 'AC'){ 
        historyContainer.textContent = '';
        resultContainer.textContent = '0';
   }

   else if(button.textContent === 'C'){
    if(resultContainer.textContent != '0')
       resultContainer.textContent = resultContainer.textContent.slice(0, -1);
   }

   else if (button.textContent === '+' || button.textContent === '-' || button.textContent === 'x' || button.textContent === '/'){

        if( (!historyContainer.textContent.includes('+') && !historyContainer.textContent.includes('-')
            && !historyContainer.textContent.includes('x') && !historyContainer.textContent.includes('/'))){

            historyContainer.textContent = resultContainer.textContent + ` ${button.textContent} `;   
            resultContainer.textContent = '0';
            }

        else if(historyContainer.textContent.endsWith(' /') && button.textContent === '/')
            alert('You can not divide by zero!');

        else if(!historyContainer.textContent.includes('=')){
            historyContainer.textContent = evalResult(historyContainer.textContent + resultContainer.textContent) 
                                                      + ` ${button.textContent} `;
                                        
            resultContainer.textContent = '0';
        }
        
        else{
            historyContainer.textContent = resultContainer.textContent + ` ${button.textContent} `;
                                        
            resultContainer.textContent = '0';
        }
    }
    else if(button.textContent === '+/-'){
        if(!(resultContainer.textContent === '0')){
            if(parseFloat(resultContainer.textContent) <= 0 ){
                resultContainer.textContent = resultContainer.textContent.slice(1);
            }
            else resultContainer.textContent = '-' + resultContainer.textContent;
        }
}

})
});

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