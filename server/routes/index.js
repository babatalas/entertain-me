const router = require("express").Router();
const MovieController = require("../controllers/MovieController");
const TvSeriesController = require("../controllers/TvSeriesController");

router.get("/movies", MovieController.findAll);
router.post("/movies", MovieController.insertOne);
router.get("/movies/:id", MovieController.findById);
router.put("/movies/:id", MovieController.updateById);
router.delete("/movies/:id", MovieController.deleteOne);

router.get("/tv-series", TvSeriesController.findAll);
router.post("/tv-series", TvSeriesController.insertOne);
router.get("/tv-series/:id", TvSeriesController.findById);
router.put("/tv-series/:id", TvSeriesController.updateById);
router.delete("/tv-series/:id", TvSeriesController.deleteOne);

module.exports = router;
