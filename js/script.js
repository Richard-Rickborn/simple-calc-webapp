let currentNumber = "";
let currentResult = "";

let displayingResult = false;
let powerON = true;
let DEBUG = false;

let exprDisplay = document.getElementById("display-upperLine");
let currNumDisplay = document.getElementById("display-mainLine");

let expr = [];
let previousExpr = [];
const acceptableOperations = ["+","-","*","^","/"];

updateDisplay();

let btn_table = {
	"btn-ON":[function(){turnOnPower();}],
	"btn-CE":[function(){clearMemory("CE")}],
	"btn-OFF":[function(){turnOffPower();}],
	"btn-AC":[function(){clearMemory("AC")}],
	"btn-7":[function(){updateCurrentNumber("7");}],
	"btn-8":[function(){updateCurrentNumber("8");}],
	"btn-9":[function(){updateCurrentNumber("9");}],
	"btn-4":[function(){updateCurrentNumber("4");}],
	"btn-5":[function(){updateCurrentNumber("5");}],
	"btn-6":[function(){updateCurrentNumber("6");}],
	"btn-1":[function(){updateCurrentNumber("1");}],
	"btn-2":[function(){updateCurrentNumber("2");}],
	"btn-3":[function(){updateCurrentNumber("3");}],
	"btn-0":[function(){updateCurrentNumber("0");}],
	"btn-00":[function(){updateCurrentNumber("00");}],
	"btn-dot":[function(){updateCurrentNumber(".");}],
	"btn-expo":[function(){addOp("^");}],
	"btn-times":[function(){addOp("*");}],
	"btn-plus":[function(){addOp("+");}],
	"btn-equals":[function(){resolveExpression();}],
	"btn-divide":[function(){addOp("/");}],
	"btn-minus":[function(){addOp("-");}],
	"btn-plusminus":[function(){plusMinus();}]
};

Object.keys(btn_table).forEach(function(element){document.getElementById(element).addEventListener("click",btn_table[element][0]);});
//pretty sure that's the longest line of javascript I've written so far, just saying



/***  FUNCTION DEFS  ***/

function addNum(){
	if(!isNaN(Number(currentNumber)) && currentNumber != null && currentNumber != ""){
		expr.push(currentNumber);
		currentNumber = "";
		updateDisplay();
		return true;
	} else {
		if(DEBUG){
			console.log("Error in addNum(), currentNumber '" + currentNumber + "' is not a number");
		}
		currNumDisplay.innerHTML = "Err"
		return false;
	}
}

function addOp(op){
	if(expr.length == 0 && currentNumber == ""){
		console.log("test");
		currentNumber = "0";
		addOp(op);
	} else if(expr != [] && (!currentNumber == "")){
			if(addNum() && acceptableOperations.includes(op)){
				expr.push(op);
				updateDisplay();
				if(DEBUG){
					console.log("expr array current state:  " + expr);
				}
			} else {
				if(DEBUG){
					console.log("Error occured in addOp(), value '" + op + "' not added to expr array.");
					console.log("currentNumber value is " + currentNumber);
				}
			}
		}
}

function clearMemory(clrLvl){
	if(clrLvl == "AC"){
		currentNumber = "";
		currentResult = "";
		displayingResult = false;
		expr = [];
		previousExpr = [];
	}
	
	if(clrLvl == "C"){
		currentNumber = "";
		currentResult = "";
		displayingResult = false;
		expr = [];
	}
	
	if(clrLvl == "CE"){
		currentNumber = "";
	}
	
	updateDisplay();
}

function getDisplayString(){
	let exprString = expr.join("").replace("*","x");// + currentNumber;
	if(exprString == ""){
		exprString = "0";
	}
	return exprString;
}

function getEvalString(){
	let evalArr = [];
	let exprLen = expr.length;
	for(let i = 0; i < exprLen; i++){
		if(expr[i] == "^"){
			evalArr.push("Math.pow(" + evalArr.pop() + "," + expr[i+1] + ")");
			i += 1;
		} else{
			evalArr.push(expr[i]);
		}
	}
	if(DEBUG == true){
		console.log("current expression:  " + expr);
		console.log("evaluation string:  '" + evalArr.join("").replace("--","+") + "'");
	}
	return eval(evalArr.join("").replace("--","+"));
}

function getLastOperation(){
	let len = previousExpr.length;
	let lastOperation = [previousExpr[len - 2], previousExpr[len - 1]];
	return lastOperation;
}

function plusMinus(){
	if(currentNumber != ""){
		currentNumber = currentNumber*-1;
		updateDisplay();
	}
}

function resolveExpression(){
	if(powerON){
		if(!displayingResult){
			addNum();
			if(DEBUG == true){
				console.log("previous expression value:  " + previousExpr);
			}
			previousExpr = expr;
			currentResult = getEvalString();
			displayingResult = true;
			updateDisplay();
			expr = [];
		} else{
			let lastOperation = getLastOperation();
			if(DEBUG == true){
				console.log("lastOperation value:  " + lastOperation);
			}
			expr = [String(currentResult)].concat(lastOperation);
			displayingResult = false;
			resolveExpression();
		}
	}
}

function turnOnPower(){
	if(!powerON){
		powerON = true;
		clearMemory("AC");
		document.getElementById("page-container").style.webkitFilter = "brightness(100%)";
	} else{
		clearMemory("C");
	}
}

function turnOffPower(){
	if(powerON){
		powerON = false;
		currNumDisplay.innerHTML = "";
		exprDisplay.innerHTML = "";
		document.getElementById("page-container").style.webkitFilter = "brightness(40%)";
	}
}

function updateCurrentNumber(num){
	if(displayingResult){
		displayingResult = false;
	}
	currentNumber = currentNumber.concat(num);
	updateDisplay();
	if(DEBUG){
		console.log("currentNumber value updated:  " + currentNumber);
	}
}

function updateDisplay(){
	if(powerON){
		if(displayingResult){
			exprDisplay.innerHTML = getDisplayString();
			currNumDisplay.innerHTML = currentResult;
		} else{
			let displayStr = getDisplayString();
			if(displayStr == "0" && currentNumber != ""){
				currNumDisplay.innerHTML = currentNumber;
			} else {
				if(displayStr != "0"){
					exprDisplay.innerHTML = getDisplayString();
				} else{
					exprDisplay.innerHTML = "";
				}
				if(currentNumber != ""){
					currNumDisplay.innerHTML = currentNumber;
				} else{
					currNumDisplay.innerHTML = "0";
				}
			}
		}
	}
}
