
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//
// Set frontend as our directory for static vue html file
//
app.use('/', serveStatic(path.join(__dirname, '../frontend')));

//
// Serve index.html to root route
//
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


//
// Get route to check prime numbers
//
app.get("/checkNumber/:number", function (req, res) {
    let number = req.params.number;
    try {
        let result = checkDivisors(number);
        res.statusCode = 200;
        res.send(result);

    } catch (error) {
        let errorMessage = { message: error.message };
        res.statusCode = 400;
        res.send(errorMessage);
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

    let inputNumber = number;
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
    var result = { number: inputNumber, divisors: divisorList, prime: isPrime }
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

app.listen(process.env.PORT || 5000);
