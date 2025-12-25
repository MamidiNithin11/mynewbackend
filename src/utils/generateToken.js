import jwt from 'jsonwebtoken';

export const generateToken=(payload)=>{
    return jwt.sign(payload,"MY_SCRET_KEY",{
        expiresIn:"10d"
    })
};