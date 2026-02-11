import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },"JWT_SECRET",
    { expiresIn: "7d" }
  );
};
