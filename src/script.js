let currentExpression = "";
let previousCommand = "";
let expResult = "";
let displayWindow = document.getElementById("display-text");
let displayingResult = false;
updateDisplay();

//clean this up later vv
/*document.getElementById("btn-7").addEventListener("click",function(){updateExpression("7");});

document.getElementById("btn-plus").addEventListener("click",function(){updateExpression("+");});

document.getElementById("btn-equals").addEventListener("click",function(){resolveExpression();});*/
//clean this up later ^^

let btn_table = {
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
	"btn-plus":[function(){updateExpression("+");}],
	"btn-equals":[function(){resolveExpression();}]
};

Object.keys(btn_table).forEach(function(element){document.getElementById(element).addEventListener("click",btn_table[element][0]);});
//pretty sure that's the longest line of javascript I've written so far, just saying

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
}  //don't really need this function anymore, maybe clean this up soon
