import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

// Request Listening
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server Running on Port http://localhost:${PORT}`);
});
