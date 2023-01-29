display = document.getElementById("display");

numBtns = document.querySelectorAll(".number");
numBtns.forEach(element => {
  element.addEventListener("click", addDigit);
});
operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach(element => {
  element.addEventListener("click", selectOperator);
});
dotBtn = document.getElementById("dot");
buttons = document.querySelectorAll("button");
buttons.forEach((elem) => elem.addEventListener("transitionend" ,removeTransition));

let operators = [];
let operands = [];
let operand = [];

function removeTransition(event){
  if (event.propertyName !== "transform") return;
    event.target.classList.remove("pressed");
}

function addDigit(event){
  event.target.classList.add("pressed");
  operand.push(event.target.textContent);
  if(event.target.textContent === "."){
    dotBtn.disabled = true;
  }
  display.textContent = operand.join("");
}

function selectOperator(event){
  event.target.classList.add("pressed");
  operand = +display.textContent;
  operator = event.target.dataset.value
  dotBtn.disabled = false;
  operands.push(operand);
  if(operator ==="EQUALS"){
    display.textContent = evaluateExpression(operands, operators);
    clearCache();
    return;
  }
  operators.push(operator);
  display.textContent = 0;
  operand = [];
}

function evaluateExpression(operands, operators){
  if(!operators || operands.length < 2){
    clearCache();
    return "ERROR"
  }
  let result = evaluate(operands[0], operands[1], operators[0]);
  if (result === "ERROR"){
    clearCache();
    return "Do not divide by 0!";
  }
  for(let i=1; i<operators.length;i++){
    result = evaluate(result, operands[i+1], operators[i]);
  }
  return result;
}
function clearCache(){
  operands = [];
  operators = [];
  operand = [];
}

function evaluate(a, b, operator){
  if(operator === "ADD") return a+b;
  if(operator === "MUL") return a*b;
  if(operator === "SUB") return a-b;
  if(operator === "DIVIDE"){
    if(b === 0) return "ERROR";
    return a/b;
  }
}