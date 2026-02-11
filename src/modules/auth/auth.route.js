import express from 'express';
import {registerUserController,
        verifyEmailController,
        loginuserController,
        forgotPasswordController,
        showResetPasswordContoller,
        resetPasswordEjsController} from './auth.controller.js';

const router=express.Router();

router.post('/register',registerUserController); 
router.get('/verify-email/:token',verifyEmailController); 
router.post('/login',loginuserController); // with mail & password 
router.post('/forgot-password',forgotPasswordController); // add email
router.get('/reset-password/:token',showResetPasswordContoller) // add new password and token in params;
router.post('/reset-password/:token',resetPasswordEjsController)

export default router;

