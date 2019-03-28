require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
moment().format();

var action = process.argv[2];
var inputs = process.argv[3];


switch (action) {
    case "concert-this":
      concert(inputs);
      break;
  
    case "spotify-this-song":
      spotify(inputs);
      break;
  
    case "movie-this":
      movie(inputs);
      break;
  
    case "do-what-it-says":
      doIt();
      break;

    default:
    console.log("I dont know what you want, but I will in the future :)")
  }


function concert(inputs){
   var queryUrl =  "https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp";

   axios.get(queryUrl).then(function(response) {
      console.log("Name of the venue: " + response.data[i].venue.name);
      console.log("Venue location: " + response.data[i].venue.city);
      console.log("Date of the Event: " + date);
      
    });
  
}


function spotify(inputs) {
    var spotify = new Spotify(keys.spotify);
    if (inputs === "" || inputs === undefined) {
      inputs = "Ace of Base";
    }
    spotify.search({ type: "track", query: inputs }, function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
  
      var songInfo = data.tracks.items;
      console.log("Artist(s): " + songInfo[0].artists[0].name);
      console.log("Song Name: " + songInfo[0].name);
      console.log("Preview Link: " + songInfo[0].preview_url);
      console.log("Album: " + songInfo[0].album.name);
  
    });
  }

  function movie(inputs) {
   
    if (inputs === undefined || inputs === "") {
      inputs = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";
  
    axios.get(queryUrl).then(function(response) {
        
          console.log("Title: " + response.data.Title);
          console.log("Year: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        });
    
    };



    function doIt() {
  fs.readFile("random.txt", "utf-8", function(err, data) {
    console.log(data);
  });
}
