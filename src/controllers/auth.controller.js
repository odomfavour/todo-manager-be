import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    console.log('here')
    try {
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).json({message: 'User already exists'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"})

    }
}

export const login = async (req, res ) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(401).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        
        res.json({
             _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({messsage: "Server error"})
    }
}