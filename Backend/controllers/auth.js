const User=require('../models/user');
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken')
exports.Signup=async(req,res)=>{
  try{  
   const { fullName, email, password, confirmPassword, phoneNumber}=req.body;
   if(password !== confirmPassword)
     return res.status(400).json({message:'Password and Confirm password needs to match'}); 
   let user=await User.findOne({email})
   if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }
 const salt=await bcrypt.genSalt(10);
 const hashPassword =await bcrypt.hash (password,salt);
 user =new User({
    name:fullName,
    email:email,
    password:hashPassword,
    phone:phoneNumber
 })
 await user.save();
 const token =jwt.sign(
    {userId:user._id},
    process.env.JWT_SECRET,
    {expiresIn:'7d'}
 );
 res.status(201).json({
    token,
    user: {
        _id:user._id,
        name:user.name,
        email:user.email
    }
 })
}
catch(error)
{
    res.status(500).json({message:'Server error'});
}

}
 exports.signIn = async(req,res)=>{
    try {
        console.log('req.body',req.body) 
        const { email, password } = req.body;
    
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        // Create JWT token
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
    
        res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email
          }
        });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
      }
}