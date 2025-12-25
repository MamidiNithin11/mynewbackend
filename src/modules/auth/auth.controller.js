// import { generateToken } from '../../utils/generateToken.js';
import {createUser} from './auth.service.js';

// Register :
export const registerUserController=async (req,res)=>{
    try{
        await createUser(req.body);
        res.status(201).render('register-success')
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

// // export const loginUserController=async (req,res)=>{
// //     try{
// //         const loginResponse= await validateloginUser(req.body);
// //         const token=generateToken({
// //             newtoken


// //         })


//     }catch(error){
//         res.status(400).json({message:error.message});
//     }
// }


