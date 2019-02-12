// // Include the node-geocoder NPM package (Remember to run "npm install node-geocoder"!)
// var NodeGeocoder = require("node-geocoder");

// // Replace with your mapquest consumer API key
// var options = {
//   provider: "mapquest",
//   apiKey: "fY15s3iG9qNJ5ramHXJq6wzqoicYHUbr"
// };

// // Create a geocoder object that can query the mapquest API
// var geocoder = NodeGeocoder(options);

// // Take in the command line arguments
// var city = process.argv[2];
// var state = process.argv[3];

// // Build your address as an array or string
// var address = city + " " + state;


// // Then use the geocoder object to search the address
// geocoder.geocode(address, function(err, data) {

//   console.log(JSON.stringify(data, null, 2));
// })

//--------------------------

var axios = require("axios");

// We then run the request with axios module on a URL with a JSON
axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);


