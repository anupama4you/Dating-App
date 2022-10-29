var pool = require("../config/database");
var axios = require('axios');

module.exports = {
  getNearbyResturants: async (data) => {
    try {
        const neighborhood = 'chelsea'
   const borough = 'manhattan'
   const city = 'new+york+city'
   const category = 'burgers'
   const {data} = await axios.get(
   
`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${borough}+${city}&type=restaurant&key=${key}`
   )
   res.json(data)
   
    } catch (err) {
      throw new Error(err);
    }
  },
};
