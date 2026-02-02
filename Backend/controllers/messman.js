const Mess=require('../models/mess');
const User=require('../models/user');
const mongoose=require('mongoose');
exports.createMess=async(req,res,err)=>{
 try{
   console.log('new mess create req......');
   const{name,member,username}=req.body;
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
    members:[{name:username,
      id:member
    }],
    managerId:member
  })
await mess.save()
user.isManager=true;
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
  console.log('messid:',id);
const {userid,username}=req.body;
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
mess.members.push({id:userid,name:username});
user.mess={id:mess._id,
  name:mess.name,
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
exports.searchMem = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters',
        data: []
      });
    }

    const searchQuery = q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const users = await User.find({
      $and: [
        {
          $or: [
            { name: { $regex: searchQuery, $options: 'i' } },
            { email: { $regex: searchQuery, $options: 'i' } }
          ]
        },
        {
          $or: [
            { mess: { $exists: false } },
            { mess: null }
          ]
        }
      ]
    }).select('name email _id');

    console.log(`Found ${users.length} users matching "${q}"`);

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    console.error("Error in searchMem:", err);
    return res.status(500).json({
      success: false,
      message: 'Server error while searching users',
      error: err.message,
      data: []
    });
  }
};
exports.messMember=async(req,res)=>{
const {id}=req.params;
const mess=await Mess.findById(id);
console.log('the mess',mess);
try{
if(!mess)
  {
    return res.status(404).json({
      success: false,
      message: "No mess Found"
  }); 
}
console.log('returning ans');
return res.status(201).json({
  success:true,
  data:mess.members
})
  
}
catch(err){
console.log("Erro: ",err);
}
}
exports.editMan = async (req, res) => {
  try {
    console.log('eikhane');
    const { id } = req.params;
    const { newManagerId, oldManagerId } = req.body;

    // Validation
    if (!newManagerId || !oldManagerId) {
      return res.status(400).json({
        success: false,
        message: 'Both oldManagerId and newManagerId are required'
      });
    }

    if (oldManagerId === newManagerId) {
      return res.status(400).json({
        success: false,
        message: 'New manager cannot be the same as old manager'
      });
    }

    // Find mess first
    const existingMess = await Mess.findById(id);
    if (!existingMess) {
      return res.status(404).json({
        success: false,
        message: 'Mess not found'
      });
    }

    // Verify current manager
    if (existingMess.managerId.toString() !== oldManagerId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    // Verify new manager is a member
    const isMember = existingMess.members.some(member => 
      (member.id || member._id).toString() === newManagerId.toString()
    );

    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: 'New manager must be a member'
      });
    }

    // Update mess first
    const mess = await Mess.findByIdAndUpdate(
      id,
      { managerId: newManagerId },
      { new: true }
    );

    if (!mess) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update mess'
      });
    }

    // Update both users in parallel
    const [oldManager, newManager] = await Promise.all([
      User.findByIdAndUpdate(
        oldManagerId,
        { isManager: false },
        { new: true }
      ),
      User.findByIdAndUpdate(
        newManagerId,
        { isManager: true },
        { new: true }
      )
    ]);
   // console.log("old "+oldManager+" new "+isManager+".");

    // Check if both users updated successfully
    if (!oldManager || !newManager) {
      // Rollback mess update if user update failed
      await Mess.findByIdAndUpdate(
        id,
        { managerId: oldManagerId }
      );

      return res.status(500).json({
        success: false,
        message: 'Failed to update users, changes rolled back',
        details: {
          oldManagerFound: !!oldManager,
          newManagerFound: !!newManager
        }
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: `Manager changed from ${oldManager.name} to ${newManager.name}`,
      data: {
        mess: mess,
        oldManager: {
          id: oldManager._id,
          name: oldManager.name,
          isManager: oldManager.isManager
        },
        newManager: {
          id: newManager._id,
          name: newManager.name,
          isManager: newManager.isManager
        }
      }
    });

  } catch (err) {
    console.error('Error in editMan:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};