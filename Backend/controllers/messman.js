const Mess=require('../models/mess');
const User=require('../models/user');

exports.createMess=async(req,res,err)=>{
 try{
   console.log('new mess create req......');
   const{name,member}=req.body;
   const user=await User.findById(member);
   if(user.mess.id!=null)
   {
    return res.status(400).json({
        message:`Can't create a mess while being in a Mess`
    })
   }
   let existingMesses = await Mess.find({ name: { $regex: `^${name}` } });

   // Generate the new mess name based on count
   if(!name)
   {
    return res.status(400).json({ message: 'Name are required' });
   }
   let newName = name;
   if (existingMesses.length > 0) {
     newName = `${name}${existingMesses.length}`;
   }
  const mess= new Mess({
    name: newName,
    members:[member],
    managerId:member
  })
await mess.save()
user.status='Manager';
user.mess={id:mess._id,
  name:mess.name
};
await user.save()
return res.status(201).json({
    message:'Mess Created successfully',
    mess
});
}
 catch(err){
    console.error('Error creating mess:',err);
    return res.status(500).json({ message: 'Server error' });
 }
}
exports.addMem=async(req,res)=>{
try{
  const {id}=req.params;
const {userid}=req.body;
let mess=await Mess.findById(id);
if(!mess)
{
  return res.status(404).json({
    success: false,
    message: "No mess Found"
});
}
const user= await User.findById(userid);
if(user.mess && user.mess.id)
{
  return res.status(404).json({
    success:false,
    message:"User is already in a Mess"
  })

}
mess.members.push(userid);
user.mess={id:mess._id,
  name:mess.name
}
await mess.save();
await user.save();
return res.status(200).json({
  success: true,
  message: "Member added successfully",
  data: {
      mess: {
          id: mess._id,
          name: mess.name,
          totalMembers: mess.members.length
      },
      user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mess: user.mess
      }
  }
});
}
catch(err)
{
console.log("ERRor is ",err)
}
}
exports.editMan=(req,res)=>{

}
