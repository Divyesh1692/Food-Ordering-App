const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware");
const { placeOrder, viewOrder } = require("../controllers/orderController");

const orderRouter = Router();

orderRouter.post("/", auth, placeOrder);
orderRouter.get("/:userId", auth, viewOrder);

module.exports = orderRouter;
