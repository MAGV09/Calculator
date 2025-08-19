'use strict';

const hero = document.querySelector('#main-hero');
const clear = document.querySelector('#clear-btn');
const displayVal = document.querySelector('#display-value');
const buttonsContainer = document.querySelector('#main-content');

let containsOperator = false;
let resultDisplayed = false;
let decimalPointAllowed = true;
let previousResult = 0;

const buttons = [
  { text: '**', id: 'exp-btn' },
  { text: 'Del', id: 'del-btn' },
  { text: 'Ans', id: 'ans-btn' },
  { text: 'Clear', id: 'clear-btn' },
  { text: '7', id: 'btn-7' },
  { text: '8', id: 'btn-8' },
  { text: '9', id: 'btn-9' },
  { text: '/', id: 'div-btn' },
  { text: '4', id: 'btn-4' },
  { text: '5', id: 'btn-5' },
  { text: '6', id: 'btn-6' },
  { text: '*', id: 'multi-btn' },
  { text: '1', id: 'btn-1' },
  { text: '2', id: 'btn-2' },
  { text: '3', id: 'btn-3' },
  { text: '-', id: 'minus-btn' },
  { text: '0', id: 'btn-0' },
  { text: '.', id: 'dot-btn' },
  { text: '=', id: 'equal-btn' },
  { text: '+', id: 'plus-btn' },
];

buttons.forEach((button) => {
  const btn = document.createElement('button');
  btn.textContent = button.text;
  if (button.id) {
    btn.id = button.id;
  }
  btn.classList.add('calcBtn');
  buttonsContainer.appendChild(btn);
});

hero.addEventListener('click', (e) => {
  if (!e.target.classList.contains('calcBtn')) return;

  switch (e.target.id) {
    case 'ans-btn':
      if (previousResult) {
        displayVal.textContent += previousResult;
      }
      break;

    case 'del-btn':
      const operation = displayVal.textContent;
      if (operation) {
        displayVal.textContent = operation.slice(0, -1);
      }
      break;

    case 'clear-btn':
      displayVal.textContent = '';
      break;

    case 'dot-btn':
      if (displayVal.textContent.at(-1) !== '.' && decimalPointAllowed) {
        displayVal.textContent += '.';
        decimalPointAllowed = false;
      }
      break;

    case 'equal-btn':
      evaluate();
      containsOperator = false;
      resultDisplayed = true;
      previousResult = displayVal.textContent;
      break;

    default:
      if (isBtnOperator(e)) {
        if (containsOperator) {
          evaluate();
        }

        displayVal.textContent += e.target.textContent;

        containsOperator = true;

        decimalPointAllowed = true;
        resultDisplayed = false;
      } else {
        if (resultDisplayed) {
          displayVal.textContent = '';
        }
        displayVal.textContent += e.target.textContent;
        resultDisplayed = false;
      }
  }
});

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => {
  return num1 / num2;
};

const power = (num1, num2) => num1 ** num2;

function operate(num1, operator, num2) {
  let result;
  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case '*':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
    case '**':
      result = power(num1, num2);
  }
  if (result == Infinity) {
    console.error(`you can't divide by zero`);
    return 'ERR';
  }
  result = result % 1 === 0 ? result : floor2Decimal(result);
  return result;
}

const floor2Decimal = (num) => Math.floor(num * 100) / 100;

function checkOp(operation) {
  const op = operation.includes('+')
    ? '+'
    : operation.includes('-') && !operation.startsWith('-')
    ? '-'
    : operation.includes('**')
    ? '**'
    : operation.includes('/')
    ? '/'
    : operation.includes('*')
    ? '*'
    : 'ERR';
  return op;
}

function evaluate() {
  let operation = displayVal.textContent;
  let sign = 1;
  let op = checkOp(operation);
  if (operation.startsWith('-')) {
    sign = -1;
    operation = operation.slice(1);
    op = checkOp(operation);
  }
  if (op !== 'ERR' && !isNaN(operation.at(-1))) {
    const i = operation.indexOf(op);
    const num1 = sign * +operation.slice(0, i);
    const operator = op;
    const num2 = +operation.slice(i + op.length);
    displayVal.textContent = operate(num1, operator, num2);
  }
}

function isBtnOperator(event) {
  const operators = ['+', '-', '/', '*', '**'];
  return operators.includes(event.target.textContent);
}

document.addEventListener('keydown', (e) => {
  let key = e.key;
  if (key >= '0' && key <= '9') {
    document.querySelector(`#btn-${key}`).click();
  }
  switch (key) {
    case '+':
      document.querySelector(`#plus-btn`).click();
      break;

    case '-':
      document.querySelector(`#minus-btn`).click();
      break;

    case '*':
      document.querySelector(`#multi-btn`).click();
      break;

    case '/':
      document.querySelector(`#div-btn`).click();
      break;

    case '^':
      document.querySelector(`#exp-btn`).click();
      break;

    case '=':
    case 'Enter':
      document.querySelector(`#equal-btn`).click();
      break;

    case '.':
      document.querySelector(`#dot-btn`).click();
      break;

    case 'Backspace':
    case 'Delete':
      document.querySelector(`#del-btn`).click();
      break;

    case 'c':
      document.querySelector(`#clear-btn`).click();

      break;

    case 'r':
      document.querySelector(`#ans-btn`).click();
      break;
  }
});
