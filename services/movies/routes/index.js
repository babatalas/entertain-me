const router = require("express").Router();
const MovieController = require("../controllers/MovieController");

router.get("/movies", MovieController.findAll);
router.post("/movies", MovieController.insertOne);
router.get("/movies/:id", MovieController.findOneById);
router.put("/movies/:id", MovieController.updateOneById);
router.delete("/movies/:id", MovieController.deleteOneById);

module.exports = router;
