//server creation
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import { connect } from 'mongoose';
import userRoutes from './routes/user.js';
import companyRoute from './routes/company.js';
import jobRoute from './routes/job.js';
import applicationRoute from './routes/application.js';
import path from 'path';
dotenv.config({});

const app = express();
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));
const PORT=process.env.PORT || 3000;
//api routes
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);

// Serve static files from frontend dist folder
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Serve index.html for all other routes (SPA fallback)
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at port ${PORT}`);
})