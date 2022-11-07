var express = require("express");
var mainController = require("../controllers/mainController");
const resturantController = require("../controllers/resturantController");

exports.router = (() => {
  var mainRouter = express.Router();

  mainRouter.route("/suggestions/:uid").get(mainController.getSuggestions);
  mainRouter.route("/search").post(mainController.searchResults);

  mainRouter.route("/resturants/:uid").get(resturantController.getNearbyResturants);
  mainRouter.route("/resturant/:placeid").get(resturantController.getResturantDetails);

  return mainRouter;
})();
