const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  restaurantId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
