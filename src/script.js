/*let currentExpression = "";
let previousCommand = "";
let expResult = "";
let displayWindow = document.getElementById("display-text");
let displayingResult = false;
let powerON = true;
//updateDisplay();*/

let currentExp = "";
let currentNumber = "";

let displayingResult = false;
let powerON = true;

let displayWindow = document.getElementById("display-text");

let nums = [];
let ops = [];
let expr = [];

updateDisplay();

let btn_table = {
	"btn-ON":[function(){turnOnPower();}],
	"btn-OFF":[function(){turnOffPower();}],
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
	"btn-equals":[function(){tempResolveExpression();}],
	"btn-divide":[function(){addOp("/");}],
	"btn-minus":[function(){addOp("-");}]
};

Object.keys(btn_table).forEach(function(element){document.getElementById(element).addEventListener("click",btn_table[element][0]);});
//pretty sure that's the longest line of javascript I've written so far, just saying

/***  FUNCTION DEFS  ***/

function addNum(){
	//add a check that currentNumber is a legit number
	expr.push(currentNumber);
	currentNumber = "";
	updateDisplay();
}

function addOp(op){
	if(currentNumber != ""){
		addNum();
		expr.push(op);
		updateDisplay();
	}
}

function getDisplayString(){
	let exprString = expr.join("").replace("*","x") + currentNumber;
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
	return evalArr.join("");
}

/*function getDisplayString(){
	let exprString = "";
	for(let i = 0; i < nums.length; i++){
		exprString = exprString + nums[i];
		if(i < ops.length){
			exprString = exprString + ops[i];//.replace("*","x");
		}
	}
	if(exprString != ""){
		return exprString;
	} else{
		//throw an error?
		return "0";
	}
}*/

/*function getEvalString(){
	let exprString = "";
	for(let i = 0; i < nums.length; i++){
		if(ops[i] != "^"){
			exprString = exprString + nums[i];
			if(i < ops.length){
				exprString = exprString + ops[i];
			}
		} else {
			/**if(i < nums.length - 2){
				exprString = exprString + "Math.pow(" + nums[i] + "," + nums[i+1] + ")";
				i = i + 1;
			} else{
				exprString = exprString + "Math.pow(" + nums[i] + ",1)";
			}**/
			/*exprString = exprString + "Math.pow(" + nums[i] + "," + nums[i+1] + ")";
			i = i + 1;
		}
	//console.log(i + ":  " + exprString);
	}
	if(exprString != ""){
		return exprString;
	} else{
		//throw an error?
		return "0";
	}
}*/

function tempResolveExpression(){
	if(powerON){
		if(!displayingResult){
			addNum();
			displayingResult = true;
			updateDisplay();
			//setting previous command storage happens here?
			currentNumber = "";//seems unecessary?  currentNumber gets cleared in addNum()
		}
	}
}

function turnOnPower(){
	//if power is already on, have the "C" function happen instead
	powerON = true;
	updateDisplay();
}

function turnOffPower(){
	if(powerON){
		powerON = false;
		displayWindow.innerHTML = ""
		//then reset memory
	}
}

function updateCurrentNumber(num){
	if(displayingResult){
		displayingResult = false;
	}
	currentNumber = currentNumber.concat(num);
	updateDisplay();
	//console.log("currentNumber value:  " + currentNumber);
}

function updateDisplay(){
	if(powerON){
		if(displayingResult){
			displayWindow.innerHTML = getEvalString();
		} else{
			let displayStr = getDisplayString();
			if(displayStr == "0" && currentNumber != ""){
				displayWindow.innerHTML = currentNumber;
			} else {
				displayWindow.innerHTML = getDisplayString();
			}
		}
		console.log("currentNumber value:  " + currentNumber);
		console.log("expr array:  " + expr);
	}
}

/*class ExpressionGenerator {
	
	constructor(){
		this.nums = [];
		this.ops = [];
		this.currentExp = "";//change to currentExpression later
		this.currentNumber = "";
	}
	
	addNum(){
		//add a check that currentNumber is a legit number
		this.nums.push(this.currentNumber);
		this.currentNumber = "";
		this.updateDisplay();
	}
	
	addOp(op){
		this.addNum();
		this.ops.push(op);
	}
	
	updateCurrentNumber(num){
		if(displayingResult){
			displayingResult = false;
		}
		this.currentNumber = this.currentNumber.concat(num);
		this.updateDisplay();
		//console.log(this.currentNumber);
	}
	
	updateDisplay(){
		if(powerON){
			if(displayingResult){
				displayWindow.innerHTML = this.toEvalString();
			} else{
				displayWindow.innerHTML = this.toString() + this.currentNumber;
			}
		}
	}
	
	tempResolveExpression(){
		if(powerON){
			if(!displayingResult){
				displayingResult = true;
				this.updateDisplay();
				this.currentNumber = "";
			}
		}
	}
	
	toEvalString(){
		let exprString = "";
		for(let i = 0; i < this.nums.length; i++){
			if(this.ops[i] != "^"){
				exprString = exprString + this.nums[i];
				if(i < this.ops.length){
					exprString = exprString + this.ops[i];
				}
			} else {
				if(i < this.nums.length - 2){
					exprString = exprString + "Math.pow(" + this.nums[i] + "," + this.nums[i+1] + ")";
					i = i + 1;
				} else{
					exprString = exprString + "Math.pow(" + this.nums[i] + ",1)";
				}
			}
		//console.log(i + ":  " + exprString);
		}
		if(exprString != ""){
			return exprString;
		} else{
			//throw an error?
			return "0";
		}
	}
	
	toString(){
		let exprString = "";
		for(let i = 0; i < this.nums.length; i++){
			exprString = exprString + this.nums[i];
			if(i < this.ops.length){
				exprString = exprString + this.ops[i];//.replace("*","x");
			}
		}
		if(exprString != ""){
			return exprString;
		} else{
			//throw an error?
			return "0";
		}
	}
}*/

/*let testCalc = new ExpressionGenerator();

testCalc.updateCurrentNumber("2");
testCalc.updateCurrentNumber("2");

testCalc.addOp("+");

testCalc.updateCurrentNumber("3");

testCalc.addOp("*");

testCalc.updateCurrentNumber("5");

testCalc.addOp("-");

testCalc.updateCurrentNumber("7");

testCalc.addOp("^");

//testCalc.updateCurrentNumber("3");

testCalc.addNum();
//this last addNum() would be run automatically when you pressed equals

console.log(testCalc.nums);
console.log(testCalc.ops);
console.log(testCalc.currentNumber === "");
//^^ so far this is CONFIRMED working.  Now, once I get the toString() working, I should be able to implement this into the actual calculator and clean up a lot of code in this file.

console.log("Final result:  '" + testCalc.toEvalString() + "'");
//LATEST UPDATE:
/* The toString() function appears to be working.  The next step is to integrate the ExpressionGenerator class into the actual calculator functionality and do a bunch of tests to make sure strings are being generated properly, then add in eval() functionality with equals and make sure order of operations are being observed
*/

//ORIGINAL BUTTON TABLE
/*let btn_table = {
	"btn-ON":[function(){turnOnPower();}],
	"btn-OFF":[function(){turnOffPower();}],
	"btn-7":[function(){updateExpression("7");}],
	"btn-8":[function(){updateExpression("8");}],
	"btn-9":[function(){updateExpression("9");}],
	"btn-4":[function(){updateExpression("4");}],
	"btn-5":[function(){updateExpression("5");}],
	"btn-6":[function(){updateExpression("6");}],
	"btn-1":[function(){updateExpression("1");}],
	"btn-2":[function(){updateExpression("2");}],
	"btn-3":[function(){updateExpression("3");}],
	"btn-0":[function(){updateExpression("0");}],
	"btn-00":[function(){updateExpression("00");}],
	"btn-dot":[function(){updateExpression(".");}],
	"btn-times":[function(){updateExpression("*");}],
	"btn-plus":[function(){updateExpression("+");}],
	"btn-equals":[function(){resolveExpression();}],
	"btn-divide":[function(){updateExpression("/");}],
	"btn-minus":[function(){updateExpression("-");}]
};*/

/*function updateExpression(str){
	if(powerON){
		currentExpression += str;
		
		if(displayingResult){
			displayingResult = false;
		}
		
		if(expResult != ""){
			expResult = "";
		}
		
		updateDisplay();
		console.log("updateExpression called: " + str);
	}
}*/

/*function resolveExpression(){
	if(powerON){
		if(!displayingResult){
			expResult = eval(currentExpression).toString();
			displayingResult = true;
			updateDisplay();
			//previousCommand = //the last operation and number in the string, i.e. "1+1+2+7" would end up with a previousCommand of "+7"
			currentExpression = "";
		} else{
			currentExpression = expResult + "+37"; //temp value until I can get lastOperation saving working
			displayingResult = false;
			resolveExpression();
		}
	}
}*/

/*function updateDisplay(){
	if(powerON){
		if(displayingResult){
			displayWindow.innerHTML = expResult;
		} else{
			if(currentExpression != ""){
				displayWindow.innerHTML = currentExpression.replace("*","x");
			} else{
				displayWindow.innerHTML = "0";
			}
		}
	}
}*/

//vv don't really need this function anymore, maybe clean this up soon
/*function runTestExpression(){
	updateExpression("1");
	updateExpression("+");
	updateExpression("2");
	updateExpression("*");
	updateExpression("100000000");
	resolveExpression();
	console.log(expResult);
}*/  //^^ don't really need this function anymore, maybe clean this up soon
