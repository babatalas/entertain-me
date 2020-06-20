const router = require("express").Router();
const MovieController = require("../controllers/MovieController");
const TvSeriesController = require("../controllers/TvSeriesController");

router.get("/movies", MovieController.findAll);
router.post("/movies", MovieController.insertOne);
router.get("/movies/:id", MovieController.findOneById);
router.put("/movies/:id", MovieController.updateOneById);
router.delete("/movies/:id", MovieController.deleteOneById);

router.get("/tv-series", TvSeriesController.findAll);
router.post("/tv-series", TvSeriesController.insertOne);
router.get("/tv-series/:id", TvSeriesController.findOneById);
router.put("/tv-series/:id", TvSeriesController.updateOneById);
router.delete("/tv-series/:id", TvSeriesController.deleteOneById);

module.exports = router;
