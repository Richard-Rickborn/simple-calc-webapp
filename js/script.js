/***  FUNCTION DEFS  ***/

function addNum(){
	let cleanNum = currentNumber.replace("%","");
	if(!isNaN(Number(cleanNum)) && cleanNum != null && cleanNum != ""){
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

function convertPercentage(percNum,ogNum){
	let returnVal = "";
	
	if(ogNum != undefined){
		returnVal = String(eval(ogNum)*Number(percNum.replace("%",""))*0.01);
	} else{
		returnVal = "0";
	}
	return returnVal;
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
		if(expr[i].includes("%")){
			expr[i] = convertPercentage(expr[i],eval(evalArr[i-2]));
		}
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
			if(expr.length != 0){
				if(currentNumber == ""){
					currentNumber = "0";
				}
				addNum();
				if(DEBUG == true){
					console.log("previous expression value:  " + previousExpr);
				}
				previousExpr = expr;
				currentResult = getEvalString();
				displayingResult = true;
				updateDisplay();
				expr = [];
			}
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
	if((getDisplayString() + currentNumber).length <= DISPLAY_LIMIT){
		console.log("number accepted:  " + num);
		if(num == "%"){
			if(!currentNumber.includes("%") && currentNumber != ""){
				currentNumber = currentNumber.concat(num);
			}
		} else{
			currentNumber = currentNumber.concat(num);
		}
		updateDisplay();
		if(DEBUG){
			console.log("currentNumber value updated:  " + currentNumber);
		}
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
