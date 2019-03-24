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
            var name = "Venue Name: " + response.data[i].venue.name;
            var location = "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region;
            var date = "Date of event: " + moment(response.data[i].datetime).format("L");
            console.log(name);
            console.log(location);
            console.log(date);

            fs.appendFile("log.txt", name + "\n" + location + "\n" + date + "\n" + "" + "\n", function(error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Data added to the log");
                }
            })
        }
    });
}

// Function called when loking for song information
function spotifySearch() {
    if (userInfo === undefined) {
        userInfo = "The+Sign+Ace+of+Base";
    }
    spotify.search({ type: "track", query: userInfo, limit: 1 }).then(function (response) {
        var artists = "Artists: " + response.tracks.items[0].album.artists[0].name;
        // A for loop in case there is more than one artist in a song
        for (i = 1; i < response.tracks.items[0].album.artists.length; i++) {
            artists += ", " + response.tracks.items[0].album.artists[i].name;
        }
        // Assigns variables for use in appending to the log file
        var name = "Song Name: " + response.tracks.items[0].name;
        var preview = "Song Preview: " + response.tracks.items[0].preview_url;
        var album = "Album Name: " + response.tracks.items[0].album.name;
        // Console logs needed information
        console.log(artists);
        console.log(name);
        console.log(preview);
        console.log(album);
        //Appending to the log.txt file
        fs.appendFile("log.txt", artists + "\n" + name + "\n" + preview + "\n" + album + "\n" + "" + "\n", function (error) {
            // Checks to see if there is an error appending to the file
            if (error) {
                console.log(error);
            } else {
                console.log("Data added to the log");
            }
        })
    })
}

// Function called when looking for movie information
function movieSearch() {
    if (userInfo === undefined) {
        userInfo = "Mr.+Nobody";
    }
    var queryURL = "https://www.omdbapi.com/?t=" + userInfo + "&y=&plot=short&apikey=65526309";
    axios.get(queryURL).then(function (response) {
        var title = "Title: " + response.data.Title;
        var year = "Release Year: " + response.data.Year;
        var IMDBRating = "IMDB Rating: " + response.data.imdbRating;
        var RTRating = "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value;
        var country = "Country Produced in: " + response.data.Country;
        var plot = "Plot: " + response.data.Plot;
        var actors = "Actors: " + response.data.Actors;
        // Console logs the needed information
        console.log(title);
        console.log(year);
        console.log(IMDBRating);
        console.log(RTRating);
        console.log(country);
        console.log(plot);
        console.log(actors);

        fs.appendFile("log.txt", title + "\n" + year + "\n" + IMDBRating + "\n" + RTRating + "\n" + country + "\n" + plot + "\n" + actors + "\n" + "" + "\n" , function(error) {
            // Checkes to see if theres an error appending to the file
            if (error) {
                console.log(error);
            } else {
                console.log("Data Added to Log");
            }
        })
    })
}

// Function for reading information from the file
function checkFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        // Reassigning the values of the variables to the values found in the file
        var dataArr = data.split(",");
        var dataArr2 = dataArr[1].split(" ");
        userRequest = dataArr[0];
        userInfo = dataArr2[0];
        for (i = 1; i < dataArr2.length; i++) {
            userInfo += "+" + dataArr2[i];
        }
        // Calling the function to run the switch again with new values
        runInfo();
    })

}