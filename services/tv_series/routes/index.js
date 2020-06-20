const router = require("express").Router();
const TvSeriesController = require("../controllers/TvSeriesController");

router.get("/tv-series", TvSeriesController.findAll);
router.post("/tv-series", TvSeriesController.insertOne);
router.get("/tv-series/:id", TvSeriesController.findOneById);
router.put("/tv-series/:id", TvSeriesController.updateOneById);
router.delete("/tv-series/:id", TvSeriesController.deleteOneById);

module.exports = router;
