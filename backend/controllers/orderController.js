const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    let { userId, restaurantId, foodItems, totalAmount } = req.body;
    let order = await Order.create({
      userId: userId,
      restaurantId: restaurantId,
      foodItems: foodItems,
      totalAmount: totalAmount,
    });
    res
      .status(201)
      .send({ message: "Order placed successfully", order: order });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const viewOrder = async (req, res) => {
  try {
    let { userId } = req.params;
    let orders = await Order.find({ userId: userId });
    res
      .status(200)
      .send({ message: "Order view successfully", orders: orders });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { placeOrder, viewOrder };
