require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var userInput = process.argv;
var userRequest = userInput[2];
var userInfo = userInput[3];

for (i = 4; i < userInput.length; i++) {
    userInfo += "+" + userInput[i];
}

switch(userRequest) {
    case "concert-this":
    concert();
    break;

    case "spotify-this-song":
    spotifySearch();
    break;

    default:
    console.log("error");
}

function concert () {
var queryURL = "https://rest.bandsintown.com/artists/" + userInfo + "/events?app_id=codingbootcamp"
console.log(queryURL);
axios.get(queryURL).then(function(response) {
    console.log(response);
})
}

function spotifySearch () {

}