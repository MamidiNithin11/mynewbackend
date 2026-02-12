import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorizationMiddleware = (req, res, next) => {
  try {
    const userId = req.params.id;
    const requestingUserId = req.user.id;

    // Allow users to delete only their own account
    // Or allow admins to delete any user
    if (userId !== requestingUserId) {
      return res.status(403).json({ message: 'You are not authorized to delete this user' });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Authorization failed' });
  }
};
