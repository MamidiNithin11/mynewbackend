import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
import {sendVerificationEmail} from '../../utils/sendVerificationEmail.js'
import {sendResetPasswordEmail} from '../../utils/sendresetpassword.js'
import {generateToken} from "../../utils/token.js"


export const createUser= async ({name,email,password})=>{
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
        verificationTokenExpires :Date.now()+24*60*60*1000,
        isVerified:false
    });
    console.log(newUser);
    
    await sendVerificationEmail(newUser.email,newUser.verificationToken);
    return newUser;
};

// Checking :
export const Emailverify= async(token)=>{
    const user=await User.findOne({
        verificationToken:token,
        verificationTokenExpires:{$gt:Date.now()}
    });
    if(user===null){
        throw new Error("Invalid or expired token");
    }
    user.isVerified=true;
    user.verificationToken=null;
    user.verificationTokenExpires=null;
    await user.save();
    return true;
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  // Email verification check
  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials: Password not matched");
  }

  const token = generateToken(user._id);
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token
  };
};


export const forgotPassword= async(email)=>{
    const user=await User.findOne({email});
    if(!user){
        throw new Error("User with this email does not exist");
    }

    const resetToken=crypto.randomBytes(32).toString('hex'); // <-Token created Here

    user.forgotPasswordToken=resetToken; // Saved in DB
    user.forgotPasswordTokenExpires=Date.now()+60*60*1000; // time (1-Hour) for token expire;
    await user.save();

    await sendResetPasswordEmail(user.email,resetToken); // This function can send Mail to User
}

export const validateResetToken= async(token)=>{
    const user =await User.findOne({
        forgotPasswordToken:token,
        forgotPasswordTokenExpires:{$gt:Date.now()}
    });

    if(user===null){
        throw new Error("Invalid or Expired Token")  
    }    
    return true;
};


export const resetPasswordEjs= async(token,newPassword)=>{
    const user =await User.findOne({
        forgotPasswordToken:token,
        forgotPasswordTokenExpires:{$gt:Date.now()}
    });
    if (user===null){
        throw new Error("Invalid or Expired Token")
    }   
    user.password=await bcrypt.hash(newPassword,10);;
    user.forgotPasswordToken=null;
    user.forgotPasswordTokenExpires=null;
    await user.save();
}
