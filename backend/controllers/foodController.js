const Food = require("../models/Food");

const addFood = async (req, res) => {
  try {
    let { name, price, category } = req.body;
    let { restaurantId } = req.params;
    let createdBy = req.user._id;
    let food = await Food.create({
      name: name,
      price: price,
      category: category,
      restaurantId: restaurantId,
      createdBy: createdBy,
    });
    res.status(200).send({ message: "Food added successfully", food: food });
  } catch (err) {
    res.status(400).send({ message: "Error adding food", error: err.message });
  }
};

const getAllFood = async (req, res) => {
  try {
    let { restaurantId } = req.params;
    let food = await Food.find({ restaurantId });
    res.status(200).send({ message: "Food fetched successfully", food: food });
  } catch (err) {
    res
      .status(400)
      .json({ message: "error fetching food", error: err.message });
  }
};

const getFoodById = async (req, res) => {
  try {
    let food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).send({ message: "Food not found" });
    }
    res.send(food);
  } catch (err) {
    res
      .status(400)
      .json({ message: "error fetching food", error: err.message });
  }
};

const updateFood = async (req, res) => {
  try {
    let food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).send({ message: "Food not found" });
    }
    if (food.createdBy == req.user._id) {
      food = await Food.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).send({ message: "food updated", food: food });
    }
    res.status(403).send({ message: "Unauthorized to update this food" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "error updating food", error: err.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    let food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).send({ message: "Food not found" });
    }
    if (food.createdBy == req.user._id) {
      await Food.findByIdAndRemove(req.params.id);
      return res.status(200).send({ message: "Food deleted" });
    }
    res.status(403).send({ message: "Unauthorized to delete this food" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "error deleting food", error: err.message });
  }
};

module.exports = { addFood, getFoodById, updateFood, deleteFood, getAllFood };
