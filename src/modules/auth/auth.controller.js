import {createUser,
       Emailverify,
       loginUser,
       forgotPassword,
       validateResetToken,
       resetPasswordEjs} from './auth.service.js';

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
        const email=await Emailverify(req.params.token);
        if(email===false){
            return res.status(400).json({message:"Invalid or Expired Token"})
        }
        res.render('register-success');
    }catch(error){
        res.status(400).json({message:"Invalid Token it is Expired"})
    }
}

export const loginuserController = async(req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({
      message: "Login Successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};


export const forgotPasswordController = async(req,res)=>{
    try{
        const resetToken=await forgotPassword(req.body.email);
        res.status(200).json({message:"Password reset email sent if the email is registered",resetToken})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

export const showResetPasswordContoller = async(req,res)=>{
    try{
        await validateResetToken(req.params.token);
        return res.render("reset-password",{tokens:req.params.token})
    }catch(error){
        return res.render("reset-success",{message:error.message})
    }
}


export const resetPasswordEjsController= async(req,res)=>{
    try{
        await resetPasswordEjs(req.params.token,req.body.password);
        return res.render("reset-success", { message: "Password updated successfully" });
    }catch(error){
        return res.render("reset-success", { message: error.message });
    }
}

