const userModel = require("../models/userModel");
const resturantModel = require("../models/resturantModel");
const pictureModel = require("../models/pictureModel");
const tagModel = require("../models/tagModel");
const mainService = require("../services/mainService");
const moment = require("moment");
var axios = require('axios');

module.exports = {
    getNearbyResturants: async (req, res, next) => {

      var user = await userModel.findOne("id", req.params.uid);

            let lat = user[0].geo_lat ? user[0].geo_lat : -33.8670522;
            let lng = user[0].geo_long ? user[0].geo_long :151.2100055;
            let placeId = "";

            const API_KEY = "AIzaSyCNvWhIZyoxmPh4SFXy_qIee_kipxyFRoA"
            const {data} = await axios.get(
            
         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&rankBy=distance&radius=1500&type=restaurant&key=${API_KEY}`
            )
            return res.status(200).json({ list: data });
            // console.log(data);
            // data.results.map((data, index) => {
            //   console.log(data.place_id)
            // })
            },

            getResturantDetails: async (req, res, next) => {
                    const placeId = req.params.placeid;
                    console.log('placeId', placeId)
                    const API_KEY = "AIzaSyCNvWhIZyoxmPh4SFXy_qIee_kipxyFRoA"
                    const {data} = await axios.get(
                    
                 `https://maps.googleapis.com/maps/api/place/details/json
                 ?place_id=${placeId}
                 &key=${API_KEY}`
                    )
                    return res.status(200).json({ list: data });
                    } 
         
};