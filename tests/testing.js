//		test:  addNum()		//
/* 
	Expected function behavior:  addNum() should take the currentNumber string value, test that it can be parsed into a legitimate number, and if so add that value to the end of the "expr" array.  If the value is NOT a number, the value will not be added to the array.
*/

let testSuccessful = true;
resetValues();
console.log("testing addNum()...");

currentNumber = undefined;
addNum();
if(expr.length != 0){
	console.log("addNum() failure:  undefined accepted as valid number");
	testSuccessful = false;
}
currentNumber = null;
addNum();
if(expr.length != 0){
	console.log("addNum() failure:  null accepted as valid number");
	testSuccessful = false;
}
currentNumber = "1";
addNum();
if(!expr.includes("1")){
	console.log("addNum() failure:  1 not accepted as valid number");
	testSuccessful = false;
}
currentNumber = "-20000";
addNum();
if(!expr.includes("-20000")){
	console.log("addNum() failure:  -20,000 not accepted as valid number");
	testSuccessful = false;
}
currentNumber = "5.3467";
addNum();
if(!expr.includes("5.3467")){
	console.log("addNum() failure:  5.3467 not accepted as valid number");
	testSuccessful = false;
}

if(expr.length == 3 && testSuccessful){
	console.log("addNum() test completed successfully");
}



//		test:  addOp(op)		//
/*
	Expected function behavior:  addOp(op) should take the given value, check that it is within the acceptable list of operations, and then run addNum(), adding the current operation to expr ONLY IF addNum() runs successfully
*/

resetValues();
console.log("testing addOp()...");

currentNumber = undefined;
addOp("+");
if(expr.length != 0){
	console.log("addOp() failure:  function still runs after unsuccessful addNum()");
	testSuccessful = false;
}
DEBUG = true;
currentNumber = "37";
addOp("a");
if(expr.length != 0){
	console.log("addOp() failure:  invalid operation value ('a') accepted");
	testSuccessful = false;
}
DEBUG = false;
currentNumber = "23";
addOp("+");
if(expr.length != 2 && !expr.includes("+")){
	console.log("addOp() failure:  valid operation ('+') not accepted after successful addNum() call");
	testSuccessful = false;
}
//can you think of any more addOp tests??


function resetValues(){
	currentNumber = "";
	expr = [];
	displayingResult = false;
	testSuccessful = true;
	displayWindow.innerHTML = "testing...";
}