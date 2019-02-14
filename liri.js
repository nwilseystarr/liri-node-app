require("dotenv").config();

var keys = require("./keys.js");

//=============== If statement for input =============== 

switch (process.argv[2]) {
    case "movie-this":
        omdb()
        break;
    case "spotify-this-song":
        song()
        break;
    case "concert-this":
        bands()
        break;
    case "do-what-it-says":
        doIt()
        break;
};

//=============== End if statement for input =============== 

//=============== Start OMDB ===============

// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

function omdb() {
    var axios = require("axios");

    var nodeArgs = process.argv;

    var movieName = process.argv[3];

    if (!process.argv[3]){
        movieName = "Mr. Nobody";
    }

    //Loop through to put a + instead of a space for the qurl
    for (var i = 4; i < nodeArgs.length; i++) {
        //template literal to grab the next indices and add a + for the qurl
        movieName += `+${nodeArgs[i]}`
    }

    //Constructing the queryurl 
    var qurl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(qurl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            //rotten tomatoes rating
            console.log("Country Produced In: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Release Year: " + response.data.Year);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors + "\n");
        }
    );
};

//=============== End OMDB ===============

//=============== Start Spotify ===============

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

function song() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);

    var songName = process.argv[3];

    if (!process.argv[3]){
        songName = "The Sign";
    }

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("Link to Song: " + data.tracks.items[0].external_urls.spotify + "\n");
    });
};

//=============== End Spotify ===============

//=============== Start Bands in Town API ===============

// * if no artist name need default

function bands() {
    var axios = require("axios");
    var moment = require("moment");

    var nodeArgs = process.argv;

    var artistName = process.argv[3];

    if (!process.argv[3]){
        artistName = "Cardi B";
    }

    //Loop through to put a + instead of a space for the qurl
    for (var i = 4; i < nodeArgs.length; i++) {
        //template literal to grab the next indices and add a + for the qurl
        artistName += `+${nodeArgs[i]}`
    }

    //constructing the queryurl
    var qurl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    console.log(qurl);

    axios.get(qurl).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city);
                var date = moment((response.data[i].datetime)).format("MM/DD/YYYY");
                console.log("Date: " + date + "\n");
            }
        }
    );
};

//=============== End Bands in Town API ===============

//=============== Start Do What It Says ===============

function doIt() {
    var fs = require('fs');
        fs.readFile('random.txt', "utf8", function (err, data) {
         if (err){
             console.log("Error: " + error);
         }
         console.log(data);
         var dataArr = data.split(",");

         console.log(dataArr);

        if (dataArr[0] === 'spotify-this-song'){
            song(dataArr[1]);
        }; 
    });
};

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

//=============== Start Do What It Says ===============