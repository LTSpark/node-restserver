const {customResponseUser}=require('../../helpers/responses');

const User=require('../../models/user');

const deleteUsers=async(req,res)=>{
    const {id}=req.params;
    const user=await User.findByIdAndUpdate(id,{state: false});
    customResponseUser(res,"User deleted successfully",user);
};

module.exports=deleteUsers;
