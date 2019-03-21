require("dotenv").config();
var keys = require("./keys.js");

var userInput = process.argv;
var userRequest = userInput[2];
var userInfo = userInput[3];

for (i = 4; i < userInput; i++)

switch(userRequest) {
    case "concert-this":
    concert();
    break;

    case "spotify-this":
    spotify();
    break;

    default:
    console.log(error);
}

function concert (x) {

}

function spotify (x) {

}