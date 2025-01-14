import jwt from 'jsonwebtoken';
import { User } from './user.model.js';


export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    console.log("Request body: ", req.body);
    
    try {
        const existsUser = await User.findOne({ email });
        console.log("Query result for email: ",email, "=>", existsUser);
        
        if (existsUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const user = new User({
            name,
            email,
            password,
            role
        })
        await user.save();

        return res.status(201).json({ status: 200, user, message: 'User registered successfully' })
    } catch (error) {
        console.error("Error during user registration:", error.message);
        res.status(500).json({ message: 'Server Error' })
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const isMatch = await user.isMatchPassword(password);
        if (!isMatch) return res.status(404).json({ message: "User Password is not matched, invalid credentials" });

        const token = jwt.sign({
            _id: user._id,
            role: user.role
        },
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRY})
        return res.status(200).json({ status: 200, token, message: "User Logged In successfully" })
    } catch (error) {
        console.log("Error during login:", error.message);
        res.status(500).json({ message: "Server Error" })
    }
}


export const getUserProfile = async (req, res) => {
    const userId = req.params.id
    console.log("Request userId :", userId);
    
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" })

        return res.status(200).json({ status: 200, user, message: "User Profile is fetched successfully" })
    } catch (error) {
        console.log("Error during getting user profile:", error.message);
        res.status(500).json({ message: "Server Error" })
    }
}