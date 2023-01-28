display = document.getElementById("display");

numBtns = document.querySelectorAll(".number");
numBtns.forEach(element => {
  element.addEventListener("click", addDigit);
});

operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach(element => {
  element.addEventListener("click", selectOperator);
});

let operator = "";
let operand = []

function addDigit(event){
  operand.push(event.target.textContent);
  if(event.target.textContent === "."){
    event.target.disabled = true;
  }
  display.textContent = operand.join("");
}
function selectOperator(event){
  
}