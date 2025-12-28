import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
import {sendVerificationEmail} from '../../utils/sendVerificationEmail.js'
import {generateToken} from "../../utils/token.js"


export const createUser= async (userData)=>{
    const {name,email,password}=userData;

    if(!name || !email || !password){
        throw new Error("All fields are required");
    };

    const userExists=await User.findOne({email});
    if(userExists){
        throw new Error("User already Exists");
    };

    const hashedpassword=await bcrypt.hash(password,10);
    const verificationToken= crypto.randomBytes(32).toString('hex')

    const newUser=await User.create({
        name,
        email,
        password:hashedpassword,
        verificationToken,
        isVerified:false
    });
    console.log(newUser);
    await sendVerificationEmail(newUser.email,newUser.verificationToken);
    return newUser;
};

export const Emailverify= async(token)=>{
    const user=await User.findOne({verificationToken:token});
    if(!user){
        return res.status(400).json({message:'Invalid or User Expired token'})
    }
    user.isVerified=true;
    user.verificationToken=null;
    await user.save();
    return true;
};

export const loginUser= async (userdata)=>{
    const {email,password}=userdata
    const user= await User.findOne({email});
    if (!user){
        throw new Error('Invalid Credentils')
    }
    // Check is Email verified :
    if (!user.isVerified){
        throw new Error("Please verify your email first")
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if (!isMatch){
        throw new Error("Invalid Credentilas")
    }
    const token=generateToken(user._id)
    return {
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },
        token
    };
};