const router = require("express").Router();
const TvSeriesController = require("../controllers/TvSeriesController");

router.get("/tv-series", TvSeriesController.findAll);
router.post("/tv-series", TvSeriesController.insertOne);
router.get("/tv-series/:id", TvSeriesController.findById);
router.put("/tv-series/:id", TvSeriesController.updateById);
router.delete("/tv-series/:id", TvSeriesController.deleteOne);

module.exports = router;
