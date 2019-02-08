let currentExpression = "";
let previousCommand = "";
let expResult = "";
let displayWindow = document.getElementById("display-text");
let displayingResult = false;
let powerON = true;
updateDisplay();

class Calculation {
	
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
	}
	
	addOp(op){
		this.addNum();
		this.ops.push(op);
	}
	
	updateCurrentNumber(num){
		this.currentNumber = this.currentNumber.concat(num);
	}
	
	toString(){
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
		console.log(i + ":  " + exprString);
		}
		if(exprString != ""){
			return exprString;
		} else{
			//throw an error?
			return "0";
		}
	}
}

let testCalc = new Calculation();

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

console.log("Final result:  '" + testCalc.toString() + "'");
//LATEST UPDATE:
/* The toString() function appears to be working.  The next step is to integrate the Calculation class into the actual calculator functionality and do a bunch of tests to make sure strings are being generated properly, then add in eval() functionality with equals and make sure order of operations are being observed
*/

let btn_table = {
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
};

Object.keys(btn_table).forEach(function(element){document.getElementById(element).addEventListener("click",btn_table[element][0]);});
//pretty sure that's the longest line of javascript I've written so far, just saying

function updateExpression(str){
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
}

function resolveExpression(){
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
}

function updateDisplay(){
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
