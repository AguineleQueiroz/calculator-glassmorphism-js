'use strict'
const numbersBtns           = document.querySelectorAll('[data-number]');
const operationBtns         = document.querySelectorAll('[operator-symbol]');
const clearOutputBtn        = document.querySelector('[clear-all-data]');
const deleteDigitOutputBtn  = document.querySelector('[delete-data]');
const equalBtn              = document.querySelector('[equal-symbol]');
const lastOperandOutput     = document.querySelector('[last-operand]');
const currentOperandOutput  = document.querySelector('[current-operand]');

class Calculator {
    constructor(lastOperandOutput, currentOperandOutput) {
        this.lastOperandOutput = lastOperandOutput;
        this.currentOperandOutput = currentOperandOutput;
        this.clearDataOutput();
    }

    clearDataOutput() {
        this.currentOperand = '';
        this.lastOperand = '';
        this.operator = undefined;
    }

    updateOutput() {
        this.lastOperandOutput.innerText = `${this.lastOperand} ${this.operator || ''} `;
        this.currentOperandOutput.innerText = this.currentOperand;
    }

    appendNumbers(value){
        if (this.currentOperand.includes('.') && value == '.') return;
        this.currentOperand = `${this.currentOperand}${value.toString()}`; 
    }

    chooseOperationMath(operator){
        if (this.currentOperand == '') return;
        if (this.lastOperand != '') {
            this.calculate();
        }
        this.operator = operator;
        this.lastOperand = `${this.currentOperand}`
        this.currentOperand = '';
    }

    deleteDigit(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate(){
        let result = null;
        const currentOperandFloat = parseFloat(this.currentOperand);
        const lastOperandFloat = parseFloat(this.lastOperand);

        if (isNaN(lastOperandFloat) || isNaN(currentOperandFloat)) return;

        switch (this.operator) {
            case '+':
                result = lastOperandFloat + currentOperandFloat;
                break;
            case '-':
                result = lastOperandFloat - currentOperandFloat;
                break;
            case '*':
                result = lastOperandFloat * currentOperandFloat;
                break;
            case '÷':
                if (currentOperandFloat == 0) {
                    result = 'error.'
                }else{
                    result = lastOperandFloat / currentOperandFloat;
                }
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.lastOperand = '';
        this.operator = undefined;
    }

}

const calculator = new Calculator(lastOperandOutput, currentOperandOutput);


for (const digitsBtn of numbersBtns) {
    digitsBtn.addEventListener('click', () => {
        calculator.appendNumbers(digitsBtn.innerText);
        calculator.updateOutput();
    })    
}

for (const operatorBtn of operationBtns) {
    operatorBtn.addEventListener('click', ()=>{
        calculator.chooseOperationMath(operatorBtn.innerText);
        calculator.updateOutput();
    })    
}

clearOutputBtn.addEventListener('click', () => { 
    calculator.clearDataOutput();
    calculator.updateOutput();
})

deleteDigitOutputBtn.addEventListener('click', () => {
    calculator.deleteDigit();
    calculator.updateOutput();
})

equalBtn.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateOutput();
})

