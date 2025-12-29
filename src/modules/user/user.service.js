import User from '../../models/User.js'


export const getAllUsersService= async ()=>{
    const users=await User.find()
    if(users.length===0){
        throw new Error("No Users Found in DB")
    }
    return users
}

export const getUserByIdService = async (id)=>{
    const user=await User.findById(id)
    if (!user){
        throw new Error("User Not Found")
    }
    return user
}