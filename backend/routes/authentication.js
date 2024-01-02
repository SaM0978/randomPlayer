require("dotenv").config();
const JWT_SALT = process.env.JWT_SALT;
const ADMIN_CODE = process.env.ADMIN_CODE;
const JWT_ADMIN_SALT = process.env.JWT_ADMIN_SALT;
const express = require("express");
const { body, validationResult } = require("express-validator");
const { matchedData } = require("express-validator");
const User = require("../models/User");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bc = require("bcryptjs");
const userCheck = require("../middleware/userCheck");

const router = express.Router();

const noSpecialChars = (value) => {
  const regex = /^[a-zA-Z0-9 ]*$/;
  return regex.test(value);
};

router.post(
  "/signUp",
  [
    body("userName", "No Special Chars Allowed")
      .isLength({ min: 3 })
      .withMessage("Person field must be between 3 and 5 characters"),
    body("password", "No Special Chars Allowed")
      .isLength({ min: 3 })
      .withMessage("Person field must be at least 3 Chracters Long"),
    body("email").isEmail().withMessage("Enter a valid email"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const data = matchedData(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userExists = await User.findOne({ email: data.email });

      if (userExists) {
        return res.status(400).json("Email Is Already In Use");
      }

      const salt = await bc.genSalt(10);
      const encrypedPassword = await bc.hash(data.password, salt);
      let finalData = {
        userName: data.userName,
        password: encrypedPassword,
        email: data.email,
      };
      let model = User;

      if (data.userName.toString().endsWith(ADMIN_CODE)) {
        finalData.userName = data.userName.toString().split("/")[0];
        model = Admin;
      }

      const user = await model.create(finalData);

      res.json({ user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
  "/login",
  [
    body("password", "No Special Chars Allowed")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
    body("email").isEmail().withMessage("Enter a valid email"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const data = matchedData(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let model = User;
      let jwt_salt = JWT_SALT;

      if (data.password.endsWith(ADMIN_CODE)) {
        model = Admin;
        jwt_salt = JWT_ADMIN_SALT;
        data.password = data.password.slice(0, -ADMIN_CODE.length);
      }

      const user = await model.findOne({ email: data.email });

      if (!user) {
        return res.status(401).json({ message: "Email Not Found" });
      }

      const passCheck = await bc.compare(data.password, user.password);

      console.log(data.password);

      if (!passCheck) {
        return res.status(401).json({ message: "Incorrect Password" });
      }

      const signData = {
        user: user,
      };

      const token = jwt.sign(signData, jwt_salt);

      res.json({ token });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.delete("/logout", [body("userid")], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByIdAndDelete(req.body.userid);

    if (!user) {
      res.send("User Not Found");
    }

    res.send("Thanks For Using Our Services");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
