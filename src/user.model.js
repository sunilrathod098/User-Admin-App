import bcrypt from 'bcryptjs';
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    }
}, {timestamps: true});

//hash password before saving in database
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
//compare password
userSchema.methods.isMatchPassword = async function (hashedPassword) {
    return await bcrypt.compare(hashedPassword, this.password);
};

export const User = mongoose.model("User", userSchema);