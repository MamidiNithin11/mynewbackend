import {generateToken} from  '../../utils/generateToken.js'

import {createUser,Emailverify,loginUser} from './auth.service.js';

// Register :
export const registerUserController= async (req,res)=>{
    try{
        await createUser(req.body);
        res.status(201).json({
        success: true,
        message: 'Registration successful. Please verify your email.'
    });  
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

export const verifyEmailController= async(req,res)=>{
    try{
        await Emailverify(req.params.token);
        res.render('register-success');
    }catch(error){
        res.status(400).json({message:"Invalid Token it is Expired"})
    }
}

export const loginuserController= async (req,res)=>{
    try{
        const user= await loginUser(req.body);
        var token
        if(user.isVerified){
            token=generateToken({
                id:user._id,
                role:user.role
            });
            return token
        }
        res.json({success:true,token})
    }catch(error){
        res.status(400).json({message:"Invalid Login Credentials"})
    }
}



