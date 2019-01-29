let currentExpression = "";
let previousCommand = "";
let expResult = "";
let displayWindow = document.getElementById("display-text");
let displayingResult = false;
updateDisplay();




function updateExpression(str){
	currentExpression += str;
}

function resolveExpression(){
	expResult = eval(currentExpression).toString();
	displayingResult = true;
	updateDisplay();
	//previousCommand = //the last operation and number in the string, i.e. "1+1+2+7" would end up with a previousCommand of "+7"
	currentExpression = "";
}

function updateDisplay(){
	if(displayingResult){
		displayWindow.innerHTML = expResult;
	} else{
		if(currentExpression != ""){
			displayWindow.innerHTML = currentExpression;
		} else{
			displayWindow.innerHTML = "0";
		}
	}
}

updateExpression("1");
updateExpression("+");
updateExpression("2");
updateExpression("*");
updateExpression("100000000");


resolveExpression();
console.log(expResult);
