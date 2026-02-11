import express from 'express';
import { getAllUsersController, getUserByIdController,deleteUserController } from './user.controller.js';

const router = express.Router();
router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);
router.delete('/:id',deleteUserController);

export default router;
