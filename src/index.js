import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './user.routes.js'
dotenv.config()
const app = express()
//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/user', userRoutes);

//database connection
mongoose.connect(`${process.env.MONGODB_URL}/user_admin`)
.then(() => {
    console.log("Database connected successfully");
})
.catch((error) => {
    console.log("Database connection failed: ", error.message);
})

//server running
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

