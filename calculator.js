'use strict';

const hero = document.querySelector('#main-hero');
const clear = document.querySelector('#clear-btn');
const displayVal = document.querySelector('#display-value');
let check = false;
let check2 = false;
let dotSeperator = true;
let pervious = 0;
hero.addEventListener('click', (e) => {
  function evaluate() {
    const operation = displayVal.textContent;
    const op = operation.includes('+')
      ? '+'
      : operation.includes('-')
      ? '-'
      : operation.includes('**')
      ? '**'
      : operation.includes('/')
      ? '/'
      : operation.includes('*')
      ? '*'
      : 'ERR';
    if (op !== 'ERR' && !isNaN(operation.at(-1))) {
      const i = operation.indexOf(op);
      const num1 = +operation.slice(0, i);
      const operator = op;
      const num2 = +operation.slice(i + op.length);
      displayVal.textContent = operate(num1, operator, num2);
    }
  }
  switch (e.target.id) {
    case 'ans-btn':
      if (pervious) {
        displayVal.textContent += pervious;
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
      if (displayVal.textContent.at(-1) !== '.' && dotSeperator) {
        displayVal.textContent += '.';
        dotSeperator = false;
      }
      break;
    case 'equal-btn':
      evaluate();
      check = false;
      check2 = true;
      pervious = displayVal.textContent;
      break;
    default:
      if (
        e.target.textContent === '+' ||
        e.target.textContent === '-' ||
        e.target.textContent === '/' ||
        e.target.textContent === '*' ||
        e.target.textContent === '**'
      ) {
        if (check) evaluate();
        displayVal.textContent += e.target.textContent;

        check = true;

        dotSeperator = true;
        check2 = false;
      } else {
        if (check2) {
          displayVal.textContent = '';
        }
        displayVal.textContent += e.target.textContent;
        check2 = false;
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
