import {Router} from "express";
import User from "../models/User.js";
import {check, validationResult} from "express-validator";

const router = Router();

// /api/auth/register
router.post(
    "/register",
    [// middlewares
        check("email", "Incorrect email").isEmail(),
        check("password", "password must be longer than 6 characters").isLength({min: 6})
    ],
     async (req, res) => {
    try{

      // validation process
      const errors = validationResult(req.body);
      if(!errors.isEmpty){
        //400 - bad request status
        return res.status(400).json({
          errors: errors.array,
          message: "Wrong registration data"})
      }

      // receiving data from request
      const { email, password } = req.body;

      // search user in the database
      const candidate = await User.findOne({ email });

      // checking for same email
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with this email already exist" });
      }

      // encrypting password
      // 12 - random value for encrypting
      const randomVal = 12;
      const hashedPassword = await bcrypt.hash(password, randomVal);

      //creating new user
      const user = new User({email, password: hashedPassword});
      await user.save();

      // 201 - created status
      res.status(201).json({message: "User created"})


    }catch(e){
        console.log("Registration ERROR: ", e);
        res.status(500).json({message: `Server error ${e.message}`});
    }
})

export default router