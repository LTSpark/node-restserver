const mongoose=require('mongoose');

const {errorResponse}=require('../../helpers/responses');

const User=require('../../models/user');
const Category=require('../../models/category');

const deleteUser=async(req,res)=>{

    const session=await mongoose.startSession();
    session.startTransaction();

    try{

        const {id}=req.params;
        const deletedUser=await User.findByIdAndUpdate(id,{state: false},{new: true});

        await Category.updateMany({user: deletedUser._id},{state: false});
        const deletedCategorys=await Category.find({user: deletedUser._id});
        
        await session.commitTransaction();
        res.send({
            deletedUser,
            deletedCategorys
        });
        
    }
    catch(error){
        await session.abortTransaction();
        errorResponse(res,"Contact database administrator",error,500);
    }
    finally{
        await session.endSession();
    }
};

module.exports=deleteUser;
