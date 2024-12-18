const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

const create = async (req, res) => {
  try {
    let { name, loaction, admins } = req.body;
    let createdBy = req.user._id;
    let restaurant = await Restaurant.create({
      name: name,
      loaction: loaction,
      admins: admins,
      createdBy: createdBy,
    });
    res.status(200).send({
      message: "Restaurant created successfully",
      restaurant: restaurant,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "error creating restaurant", error: err.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    let restaurants = await Restaurant.find({});
    res.status(200).send({
      message: "Restaurants fetched successfully",
      restaurants: restaurants,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "error fetching restaurants", error: err.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    let restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).send({ message: "Restaurant not found" });
    }
    res.send(restaurant);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error updating restaurant", error: err.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    let restaurant = await Restaurant.findByIdAndRemove(req.params.id);
    if (!restaurant) {
      return res.status(404).send({ message: "Restaurant not found" });
    }
    res.send(restaurant);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error deleting restaurant", error: err.message });
  }
};

const assignAdmin = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { userId } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "Only admin users can be assigned to restaurants." });
    }

    if (!restaurant.admins.includes(userId)) {
      restaurant.admins.push(userId);
      await restaurant.save();
    }

    user.restaurantId = restaurantId;
    await user.save();

    res.status(200).json({
      message: "User assigned to the restaurant successfully.",
      restaurant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

module.exports = {
  create,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
  assignAdmin,
};
