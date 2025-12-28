import express from 'express';
import {registerUserController,
        verifyEmailController,
        loginuserController} from './auth.controller.js';

const router=express.Router();

router.post('/register',registerUserController);
router.get('/verify-email/:token',verifyEmailController);
router.post('/login',loginuserController);
export default router;

