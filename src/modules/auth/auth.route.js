import express from 'express';
import {registerUserController,
        verifyEmailController,
        loginuserController,
        forgotPasswordController,
        showResetPasswordContoller,
        resetPasswordEjsController} from './auth.controller.js';
import { validateRegister, validateLogin, validatePasswordReset, validateEmail } from '../../middleware/validateInput.js';

const router=express.Router();

router.post('/register', validateRegister, registerUserController); 
router.get('/verify-email/:token', verifyEmailController); 
router.post('/login', validateLogin, loginuserController); // with mail & password 
router.post('/forgot-password', validateEmail, forgotPasswordController); // add email
router.get('/reset-password/:token', showResetPasswordContoller) // add new password and token in params;
router.post('/reset-password/:token', validatePasswordReset, resetPasswordEjsController)

export default router;

