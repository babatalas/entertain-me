const router = require("express").Router();
const MovieController = require("../controllers/MovieController");

router.get("/movies", MovieController.findAll);
router.post("/movies", MovieController.insertOne);
router.get("/movies/:id", MovieController.findById);
router.put("/movies/:id", MovieController.updateById);
router.delete("/movies/:id", MovieController.deleteOne);

module.exports = router;
