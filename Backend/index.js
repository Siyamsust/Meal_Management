const express=require('express')
const cors =require('cors')
const mongoose =require('mongoose')
const dotenv = require('dotenv');
const authRoutes=require('./routes/auth');
const messROutes=require('./routes/messman')
dotenv.config()
// Ensure JWT secret is available to prevent jwt.sign from throwing
if (!process.env.JWT_SECRET) {
  console.warn('[WARN] JWT_SECRET is not set in environment. Using a temporary development secret.');
  process.env.JWT_SECRET = 'change-this-in-.env';
}
const app=express();
const multer= require('multer')
app.use(cors())
app.use(express.json());
const PORT=process.env.PORT;
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload=multer({storage: storage});
exports.upload =upload;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meal_management')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api',authRoutes);
app.use('/api',messROutes);
// Health check for mobile discovery
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.listen(PORT,()=>{
    console.log('Backend server running at PORT', PORT);
})