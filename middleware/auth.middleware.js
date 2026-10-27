import jwt from "jsonwebtoken";
import User from "../model/auth.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                msg: "Authorization token is required (format: Bearer <token>)"
            });
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || process.env.jwt_secret;
        if (!secret) {
            return res.status(500).json({
                success: false,
                msg: "JWT secret is not configured on the server"
            });
        }

        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Auth middleware error:", err.message);
        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token"
        });
    }
};