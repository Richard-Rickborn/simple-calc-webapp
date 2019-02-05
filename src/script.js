let currentExpression = "";
let previousCommand = "";
let expResult = "";
let displayWindow = document.getElementById("display-text");
let displayingResult = false;
updateDisplay();

document.getElementById("btn-7").addEventListener("click",function(){updateExpression("7");});

document.getElementById("btn-plus").addEventListener("click",function(){updateExpression("+");});

document.getElementById("btn-equals").addEventListener("click",function(){resolveExpression();});

let btn_table = {
	"btn-7":[function(){updateExpression("7");}],
	"":[],
	"":[]
};

/*Object.keys(obj).forEach(function (key) {
  var value = obj[key];
  
  Use to iterate through the btn_table above
  on page load to setup event listeners;
});*/

function updateExpression(str){
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

function resolveExpression(){
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

function runTestExpression(){
	updateExpression("1");
	updateExpression("+");
	updateExpression("2");
	updateExpression("*");
	updateExpression("100000000");
	resolveExpression();
	console.log(expResult);
}
