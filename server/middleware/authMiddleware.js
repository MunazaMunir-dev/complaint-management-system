const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {

    let token = req.headers.authorization;


    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }


    token = token.split(" ")[1];


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    const user = await User.findById(decoded.id);


    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    req.user = user;


    next();


  } catch (error) {

    res.status(401).json({
      message: "Invalid token",
    });

  }
};