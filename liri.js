require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");


var userInput = process.argv;
var userRequest = userInput[2];
var userInfo = userInput[3];

for (i = 4; i < userInput.length; i++) {
    userInfo += "+" + userInput[i];
}

function runInfo() {

    switch (userRequest) {
        case "concert-this":
            concert();
            break;

        case "spotify-this-song":
            spotifySearch();
            break;

        case "movie-this":
            movieSearch();
            break;

        case "do-what-it-says":
            checkFile();
            break;

        default:
            console.log("Invalid Input");
    }
}
runInfo();
function concert() {
    var queryURL = "https://rest.bandsintown.com/artists/" + userInfo + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            console.log("Venue Name: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            console.log("Date of event: " + moment(response.data[i].datetime).format("L"));
        }
    });
}

function spotifySearch() {
    if (userInfo === undefined) {
        userInfo = "The+Sign+Ace+of+Base";
    }
    spotify.search({ type: "track", query: userInfo, limit: 1 }).then(function (response) {
        console.log("Artists: " + response.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Song Preview: " + response.tracks.items[0].preview_url);
        console.log("Album Name: " + response.tracks.items[0].album.name);

    })
}

function movieSearch() {
    if (userInfo === undefined) {
        userInfo = "Mr.+Nobody";
    }
    var queryURL = "https://www.omdbapi.com/?t=" + userInfo + "&y=&plot=short&apikey=65526309";
    axios.get(queryURL).then(function (response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country Produced in: " + response.data.Country);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    })
}

function checkFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        var dataArr = data.split(",");
        // console.log(dataArr);
        var dataArr2 = dataArr[1].split(" ");
        // console.log(dataArr2);
        userRequest = dataArr[0];
        userInfo = dataArr2[0]
        for (i = 1; i < dataArr2.length; i++) {
            userInfo += "+" + dataArr2[i];
        }
        console.log(userRequest);
        console.log(userInfo);
        runInfo();
    })

}