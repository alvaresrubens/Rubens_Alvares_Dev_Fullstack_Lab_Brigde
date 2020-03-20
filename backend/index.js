
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//
// Post route to check prime numbers
//
app.post("/checkNumber", function (req, res) {

    let number = req.body.number;
    try {
        let result = checkDivisors(number);
        res.statusCode = 200;
        res.send(result);

    } catch (error) {
        let result = error.message;
        res.statusCode = 400;
        res.send(result);
    }
});

//
// Function to check the given paramater is a number
//
const validateNumber = (number) => {
    if (isNaN(number)) {
        throw new Error("Insira um valor númerico");
    } else {
        return true;
    }
}

//
// Check the divisors of the given number
//
const checkDivisors = (number) => {

    validateNumber(number);

    let divisorList = [];
    number = Number(number);
    number = number < 0 ? number : number * -1;

    for (i = number; i <= number * -1; i++) {
        if (number % i == 0) {
            divisorList.push(i);
        }
    }
    let isPrime = checkPrime(divisorList);
    var result = { divisors: divisorList, prime: isPrime }
    return result;
}

//
//Function to check if the given number is a prime number
//
const checkPrime = (divisorList) => {
    if (divisorList.length == 4) {
        return true
    }
    return false;
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});