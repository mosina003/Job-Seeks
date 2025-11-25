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

dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));
const PORT=process.env.PORT || 3000;
//api routes
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at port ${PORT}`);
})