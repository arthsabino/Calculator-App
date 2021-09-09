if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
let calculatorPrevInput = 0;
let currentOperator;
function ready() {
    let calculatorInput = document.getElementsByClassName('calculator-input')[0]
    calculatorInput.addEventListener('input', keyNumberInput)
    //number buttons
    let numberButtons = document.getElementsByClassName('btn-number');
    for(let i = 0; i < numberButtons.length; i++) {
        let button = numberButtons[i]
        button.addEventListener('click', numberButtonClicked)
    }

    //operator buttons
    let operatorButtons = document.getElementsByClassName('btn-operator');
    for(let i = 0; i < operatorButtons.length; i++) {
        let button = operatorButtons[i]
        button.addEventListener('click', operatorButtonClicked)
    }

    //Calculator operator buttons
    let calculatorOperatorButtons = document.getElementsByClassName('btn-calc-op');
    for(let i = 0; i < calculatorOperatorButtons.length; i++) {
        let button = calculatorOperatorButtons[i]
        button.addEventListener('click', calcOperatorButtonClicked)
    }

    //theme buttons
    let themeButtons = document.getElementsByClassName('btn-theme')
    for(let i = 0; i < themeButtons.length; i++) {
        let button = themeButtons[i];
        button.addEventListener('click', themeButtonClicked)
    }

    if (localStorage.getItem('theme') === 'theme-2') {
        setTheme('theme-2');
    } else if(localStorage.getItem('theme') === 'theme-3'){
        setTheme('theme-3');
    } else {
        setTheme('theme-1');
    }
}

function numberButtonClicked(event) {
    let element = event.target
    let value = element.dataset.value;
    appendToCalculatorInput(value)
}

function keyNumberInput(event) {
    let element = event.target
    displayToCalculatorInput(formatValue(element.value))
}

function formatValue(value) {
    value = value.replace(/[^0-9 \, \.]/g, '');
    return value
}

function appendToCalculatorInput(value) {
    value = formatValue(value)
    let calculatorInput = document.getElementsByClassName('calculator-input')[0]
    let calculatorInputValue = `${calculatorInput.value}${value}`
    displayToCalculatorInput(calculatorInputValue)
}

function displayToCalculatorInput(value) {
    let calculatorInput = document.getElementsByClassName('calculator-input')[0]
    let calculatorInputValue = parseFloat(`${value}`.replace(/,/g, ''))
    if(isNaN(calculatorInputValue) || calculatorInputValue < 0 || calculatorInputValue === null || calculatorInputValue === '') {
        calculatorInput.value = null;
        return;
    }
    calculatorInput.value = new Number(calculatorInputValue).toLocaleString('en')
}

function operatorButtonClicked(event){
    let element = event.target
    let calculatorInput = document.getElementsByClassName('calculator-input')[0]
    calculatorPrevInput = `${calculatorInput.value}`.replace(/,/g, '')
    currentOperator = element.dataset.value
    calculatorInput.value = null;
}

function equalButtonClicked() {
    let calculatorInput = document.getElementsByClassName('calculator-input')[0]
    let calculatorInputValue = `${calculatorInput.value}`.replace(/,/g, '')
    let expression = `${calculatorPrevInput} ${currentOperator} ${calculatorInputValue}`
    let result = evaluateInput(expression)
    displayToCalculatorInput(result)
}

function deleteButtonClicked() {
    let calculatorInput = document.getElementsByClassName('calculator-input')[0]
    let calculatorInputValue = `${calculatorInput.value}`.replace(/,/g, '')
    displayToCalculatorInput(calculatorInputValue.slice(0, -1))
}

function calcOperatorButtonClicked(event){
    let element = event.target
    if(element.dataset.value === "=") equalButtonClicked()
    else if(element.dataset.value === "del") deleteButtonClicked()
    else resetCalculator()
}

function evaluateInput(expression) {
    return eval(expression)
}
function resetCalculator() {
    let calculatorInput = document.getElementsByClassName('calculator-input')[0]
    calculatorPrevInput = 0
    currentOperator = null
    calculatorInput.value = null;
}

function themeButtonClicked(event) {
    let element = event.target
    let themeButtons = document.getElementsByClassName('btn-theme')
    removeActiveButton(themeButtons)
    element.classList.add('btn-active')
    let themeName = `theme-${element.dataset.value}`
    setTheme(themeName)

}

function removeActiveButton(buttons) {
    for(let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.classList.remove('btn-active')
    }
}

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    let themeButtons = document.getElementsByClassName('btn-theme')
    removeActiveButton(themeButtons)
    let button = document.querySelector(`.btn-theme[data-value="${themeName.replace(/[^0-9]/g, '')}"]`)
    button.classList.add('btn-active')
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-2') {
        setTheme('theme-2');
    } else if(localStorage.getItem('theme') === 'theme-3'){
        setTheme('theme-3');
    } else {
        setTheme('theme-1');
    }
}