import jwt from 'jsonwebtoken';


export const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader) return res.status(401).json({message: "Access Denied. Token is not found"});
    
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message: "Access Denied. Token is missing"})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        console.log("Decoded: ", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({message: error.message || "Invalid Token" })
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({message: "Access Denied. Admins only"});
    }
    next();
};

export const isUserProfile = (req, res, next) => {
    const userId = req.params.id;
    if (req.user._id !== userId && req.user.role !== 'admin') {
        return res.status(403).json({
            message: "Access Denied. Only user profile. You can't access this user's profile"
        });
    }
    next();
};