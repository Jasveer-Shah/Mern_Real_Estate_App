import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";              


export const signup =  async(req, res, next)=>{

    // Create a new user in mongoDB
    console.log(req.body);
    const { username, email, password } = req.body;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedpassword});
    try {
        await newUser.save();
        res.status(201).json("User Created successfully");

    }catch(error){
       next(error);
    }

}