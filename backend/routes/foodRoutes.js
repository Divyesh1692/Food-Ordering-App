const { Router } = require("express");
const { auth, checkRole } = require("../middleware/authMiddleware");
const {
  getAllFood,
  getFoodById,
  addFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

const foodRouter = Router();

foodRouter.get("/:restaurantId", auth, getAllFood);
foodRouter.get("/:id", auth, checkRole(["admin"]), getFoodById);
foodRouter.post("/:restaurantId", auth, checkRole(["admin"]), addFood);
foodRouter.patch("/:id", auth, checkRole(["admin"]), updateFood);
foodRouter.delete("/:id", auth, checkRole(["admin"]), deleteFood);

module.exports = foodRouter;
