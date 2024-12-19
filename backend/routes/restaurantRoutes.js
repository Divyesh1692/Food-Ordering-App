const { Router } = require("express");
const {
  create,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
  assignAdmin,
} = require("../controllers/restaurantController");
const { auth, checkRole } = require("../middleware/authMiddleware");

const restaurantRouter = Router();

restaurantRouter.post("/", auth, checkRole(["superadmin"]), create);
restaurantRouter.get("/", auth, getAllRestaurants);
restaurantRouter.patch(
  "/:id",
  auth,
  checkRole(["superadmin"]),
  updateRestaurant
);
restaurantRouter.delete(
  "/:id",
  auth,
  checkRole(["superadmin"]),
  deleteRestaurant
);
restaurantRouter.patch(
  "/:id/assign-admin",
  auth,
  checkRole(["superadmin"]),
  assignAdmin
);

module.exports = restaurantRouter;
