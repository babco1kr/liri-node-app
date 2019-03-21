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

    case "movie-this":
    movieSearch();
    break;

    default:
    console.log("error");
}

function concert () {
var queryURL = "https://rest.bandsintown.com/artists/" + userInfo + "/events?app_id=codingbootcamp";
console.log(queryURL);
axios.get(queryURL).then(function(response) {
    console.log(response);
});
}

function spotifySearch () {
    spotify.search({ type: "track", query: userInfo, limit: 1}).then(function(response) {
        console.log("Artists: " + response.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Song Preview: " + response.tracks.items[0].preview_url);
        console.log("Album Name: " + response.tracks.items[0].album.name);

    })
}

function movieSearch () {
    var queryURL = "https://www.omdbapi.com/?t=" + userInfo + "&y=&plot=short&apikey=65526309";
    axios.get(queryURL).then(function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country Produced in: " + response.data.Country);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    })
}