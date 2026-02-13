import express from 'express';
import rateLimit from 'express-rate-limit';
import {registerUserController,
        verifyEmailController,
        loginuserController,
        forgotPasswordController,
        showResetPasswordContoller,
        resetPasswordEjsController} from './auth.controller.js';
import { validateRegister, validateLogin, validatePasswordReset, validateEmail } from '../../middleware/validateInput.js';

// Rate limiter for login endpoint
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again later',
  statusCode: 429,
  skipSuccessfulRequests: false
});

// Rate limiter for registration endpoint
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 attempts per hour
  message: 'Too many registration attempts, please try again later',
  statusCode: 429,
  skipSuccessfulRequests: false
});

// Rate limiter for password reset endpoint
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per hour
  message: 'Too many password reset requests, please try again later',
  statusCode: 429,
  skipSuccessfulRequests: true // Only count failed requests
});

const router=express.Router();

router.post('/register', registerLimiter, validateRegister, registerUserController); 
router.get('/verify-email/:token', verifyEmailController); 
router.post('/login', loginLimiter, validateLogin, loginuserController); // with mail & password 
router.post('/forgot-password', forgotPasswordLimiter, validateEmail, forgotPasswordController); // add email
router.get('/reset-password/:token', showResetPasswordContoller) // add new password and token in params;
router.post('/reset-password/:token', validatePasswordReset, resetPasswordEjsController)

export default router;

