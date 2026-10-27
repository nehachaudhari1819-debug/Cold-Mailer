import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';
import mailRoutes from './routes/mail.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all incoming origins
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Ensure MongoDB is connected for incoming requests (serverless & local)
app.use(async (req, res, next) => {
    try {
        await connectDB();
    } catch (err) {
        console.error("Database connection middleware error:", err.message);
    }
    next();
});

// Route registrations
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/mail', mailRoutes);

// Health check and root status endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Coldmailer API is Running",
        version: "1.0.0"
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Global 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// Run server listener only in non-serverless / local environments
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on Port : ${PORT}`);
    });
}

export default app;