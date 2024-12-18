const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const generateTokenAndSetCookies = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expires: new Date(Date.now() + 86400000) });
    console.log("token generated");

    return token;
  } catch (error) {
    res.send("Error signing token: " + error.message);
  }
};

const auth = async (req, res, next) => {
  console.log("in auth");

  try {
    let token = req.cookies.token;
    console.log("Token: " + token);

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded: " + decoded);

    if (!decoded)
      return res
        .status(401)
        .json({ message: "Invalid token, authorization denied" });
    req.user = await User.findById(decoded.userId).select("-password");
    console.log(req.user);

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "error validating token", error: error.message });
  }
};

const checkRole = (roles) => (req, res, next) => {
  try {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send({ message: "Access Denied" });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

module.exports = { auth, generateTokenAndSetCookies, checkRole };
