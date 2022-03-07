import { Router } from "express";
import config from "config";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    // middlewares for registration
    check("email", "Incorrect email").isEmail(),
    check("password", "password must be longer than 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      // validation process
      const errors = validationResult(req);
       console.log("errors: ", !!errors.errors.length);
      if (!!errors.errors.length) {
        // 400 - bad request status
        return res.status(400).json({
          errors: errors.array,
          message: "Wrong registration data",
        });
      }

      // receiving data from request
      const { email, password } = req.body;
      console.log(email, password);
      // search user in the database
      const candidate = await User.findOne({ email });

      // checking for same email
      if (candidate) {
        return (res
          .status(400)
          .json({ message: "User with this email already exist" }));
      }

      // encrypting password
      // 12 - random value for encrypting
      const randomVal = 12;
      const hashedPassword = await bcrypt.hash(password, randomVal);

      //creating new user
      const user = new User({ email, password: hashedPassword });
      await user.save();

      // 201 - created status
      res.status(201).json({ message: "User created" });
    } catch (e) {
      console.log("Registration ERROR: ", e);
      res.status(500).json({ message: `Server error ${e.message}` });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    // middleware for login
    check("email", "Input correct email").normalizeEmail().isEmail(),
    check("password", "Input correct password").exists(),
  ],
  async (req, res) => {
    try {
      // validation process
      const errors = validationResult(req);
       
       if (!!errors.errors.length) {
         // 400 - bad request status
         return res.status(400).json({
           errors: errors.array,
           message: "Incorrect login data",
         });
       }

      const { email, password } = req.body;

      //checking for user existance
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

       console.log("pas: ", password);
       console.log("bcrypted pas: ", user.password);
      //checking password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Incorrect password, try again" });
      }

      //making token for authorization
      const token = jwt.sign(
        {iserId: user.id},    //data
        config.jwtSecret,     //private key
        {expiresIn: "1h"}     //token time expire
      )

      //200 OK status (or smth another???)
      res.status(200).json({token, userId: user.id});

    } catch (e) {
      console.log("Login ERROR: ", e);
      //500 - Internal Server Error status
      res.status(500).json({ message: `Server error ${e.message}` });
    }
  }
);

export default router;
