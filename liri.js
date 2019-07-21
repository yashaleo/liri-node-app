//Required Packages
require("dotenv").config();

const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const colors = require("colors");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];
var userInput2 = process.argv.slice(3).join(" ");

//=============================================================
// Concert This
//=============================================================
const concertThis = () => {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    userInput2 +
    "/events?app_id=codingbootcamp";
  axios
    .get(queryUrl)
    .then(response => {
      for (var i = 0; i < response.data.length; i++)
        var info = response.data[i];
      var concertInfo = [
        "Venue: " + info.venue.name,
        "City: " + info.venue.city,
        "Show Date: " + moment(info.datetime).format("MM/DD/YYYY")
      ];
      console.log(concertInfo);
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

//=============================================================
// Spotify This
//=============================================================
const spotifyThis = songFromFs => {
  var songName;
  if (songFromFs) {
    songName = songFromFs;
  } else if (userInput2) {
    songName = userInput2;
  } else {
    songName = "The Sign Ace of Base";
  }
  spotify.search(
    {
      type: "track",
      query: songName
    },
    (err, data) => {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[0].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
    }
  );
};

//=============================================================
// Movie This
//=============================================================

const movieThis = () => {
  if (userInput2 === "") {
    var mrNobody =
      "http://www.omdbapi.com/?t=mr-nobody&y=&plot=short&apikey=trilogy";
    axios.get(mrNobody).then(response => {
      var info = response.data;
      console.log(
        "============================================================="
      );
      var title = "Movie Title: " + info.Title;
      console.log(colors.blue(title));
      var year = "Year Release: " + info.Year;
      console.log(colors.blue(year));
      var rating = "IMDB Rating: " + info.imdbRating;
      console.log(colors.red(rating));
      var rating2 = "Rotten Tomatoes Rating: " + info.Ratings[1].Value;
      console.log(colors.red(rating2));
      var country = "Country Produced: " + info.Country;
      console.log(colors.green(country));
      var lang = "Movie Language: " + info.Language;
      console.log(colors.green(lang));
      var plot = "Plot: " + info.Plot;
      console.log(colors.magenta(plot));
      var actors = "Actors: " + info.Actors;
      console.log(colors.magenta(actors));
      console.log(
        "============================================================="
      );
    });
  } else {
    var queryUrl =
      "http://www.omdbapi.com/?t=" +
      userInput2 +
      "&y=&plot=short&apikey=trilogy";
    axios
      .get(queryUrl)
      .then(response => {
        var info = response.data;
        console.log(
          "============================================================="
        );
        var title = "Movie Title: " + info.Title;
        console.log(colors.blue(title));
        var year = "Year Release: " + info.Year;
        console.log(colors.blue(year));
        var rating = "IMDB Rating: " + info.imdbRating;
        console.log(colors.red(rating));
        var rating2 = "Rotten Tomatoes Rating: " + info.Ratings[1].Value;
        console.log(colors.red(rating2));
        var country = "Country Produced: " + info.Country;
        console.log(colors.green(country));
        var lang = "Movie Language: " + info.Language;
        console.log(colors.green(lang));
        var plot = "Plot: " + info.Plot;
        console.log(colors.magenta(plot));
        var actors = "Actors: " + info.Actors;
        console.log(colors.magenta(actors));
        console.log(
          "============================================================="
        );
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
};

//=============================================================
// Doing What it Says
//=============================================================

const doIt = () => {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
    var songFromFs = dataArr[1];
    if (dataArr[0] === "spotify-this-song") {
      spotifyThis(songFromFs);
    }
  });
};

//=============================================================
// Choices
//=============================================================
if (userInput === "concert-this") {
  concertThis();
} else if (userInput === "spotify-this-song") {
  spotifyThis();
} else if (userInput === "movie-this") {
  movieThis();
} else if (userInput === "do-what-it-says") {
  doIt();
} else {
  console.log(
    "You have to pick one of these: concert-this, spotify-this-song, movie-this, or do-what-it-says."
  );
}
