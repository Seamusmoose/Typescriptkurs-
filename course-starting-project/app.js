function add(n1, n2, showResult) {
    return showResult ? console.log("test") : n1 + n2;
}
var number1 = 3;
var number2 = 4;
var printResult = false;
add(number1, number2, printResult);
