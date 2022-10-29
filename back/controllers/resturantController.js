const userModel = require("../models/userModel");
const resturantModel = require("../models/resturantModel");
const pictureModel = require("../models/pictureModel");
const tagModel = require("../models/tagModel");
const mainService = require("../services/mainService");
const moment = require("moment");
var axios = require('axios');

module.exports = {
    getNearbyResturants: async (req, res, next) => {
        try {
            const lat = -33.8670522;
            const lng = 151.2100055;
            const API_KEY = "AIzaSyCNvWhIZyoxmPh4SFXy_qIee_kipxyFRoA"
            const {data} = await axios.get(
            
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1500&type=restaurant&keyword=cruise&key=${API_KEY}`
            )
            return res.status(200).json({ list: data });
            } 
          catch (err) {
           next(err)
         }
      },

};