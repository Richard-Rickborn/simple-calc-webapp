window.onload = function(){
	
	//global variables are bad practice, for the record
	//note to self, for the next project structure code in a way to use less global variables
	window.currentNumber = "";
	window.currentResult = "";
	
	window.displayingResult = false;
	window.powerON = true;
	window.DEBUG = false;

	window.exprDisplay = document.getElementById("display-upperLine");
	window.currNumDisplay = document.getElementById("display-mainLine");

	window.expr = [];
	window.previousExpr = [];
	window.acceptableOperations = ["+","-","*","^","/"];
	
	updateDisplay();
	setupInput();
}

function setupInput(){
	window.btn_table = {
		"btn-ON":[function(){turnOnPower();}],
		"btn-CE":[function(){clearMemory("CE");}],
		"btn-OFF":[function(){turnOffPower();}],
		"btn-AC":[function(){clearMemory("AC");}],
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
		"btn-percent":[function(){updateCurrentNumber("%");}],
		"btn-divide":[function(){addOp("/");}],
		"btn-minus":[function(){addOp("-");}],
		"btn-plusminus":[function(){plusMinus();}]
	};

	Object.keys(btn_table).forEach(function(element){document.getElementById(element).addEventListener("click",btn_table[element][0]);});
	//pretty sure that's the longest line of javascript I've written so far, just saying
	
	document.addEventListener('keydown', function(e){
		switch(e.key){
			case "Escape":
				turnOffPower();
				break;
			case " ":
				clearMemory("CE");
				break;
			case "7":
				updateCurrentNumber("7");
				break;
			case "8":
				updateCurrentNumber("8");
				break;
			case "9":
				updateCurrentNumber("9");
				break;
			case "4":
				updateCurrentNumber("4");
				break;
			case "5":
				updateCurrentNumber("5");
				break;
			case "6":
				updateCurrentNumber("6");
				break;
			case "1":
				updateCurrentNumber("1");
				break;
			case "2":
				updateCurrentNumber("2");
				break;
			case "3":
				updateCurrentNumber("3");
				break;
			case "0":
				updateCurrentNumber("0");
				break;
			case ".":
				updateCurrentNumber(".");
				break;
			case "*":
				addOp("*");
				break;
			case "+":
				addOp("+");
				break;
			case "Enter":
				if(!powerON){
					turnOnPower();
				} else{
					resolveExpression();
				}
				break;
			case "/":
				addOp("/");
				break;
			case "-":
				addOp("-");
				break;
			default:
				break;
		}
	});
}
