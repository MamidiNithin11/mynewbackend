import {getAllUsersService,getUserByIdService} from './user.service.js'

export const getAllUsersController=async(req,res)=>{
    try{
        const usersdata=await getAllUsersService();
        res.status(200).json(usersdata)
    }catch(error){
       res.status(400).json({message:error.message})
    }

}

export const getUserByIdController= async(req,res)=>{
    try{
        const user=await getUserByIdService(req.params.id)
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({message:error.message})
    }
}