require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");


var spotify = new Spotify(keys.spotify);
