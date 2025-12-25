import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

export const createUser= async (userData)=>{
    const {name,email,password}=userData;
    if(!name || !email || !password){
        throw new Error("All fields are required");
    }
    const userExists=await User.findOne({email});
    if(userExists){
        throw new Error("User already Exists");
    }
    const hashedpassword=await bcrypt.hash(password,10);

    const newUser=await User.create({
        name,
        email,
        password:hashedpassword
    });
    console.log(newUser);
    return newUser;
};