import {Router} from "express";
import User from "../models/User.js";

const router = Router();

// /api/auth/register
router.post("/register", async (req, res) => {
    try{

    }catch(e){
        res.status(500).json({message: `Server errror ${e.message}`});
    }
})

export default router