import express from 'express';
import { getAllUsersController, getUserByIdController,deleteUserController } from './user.controller.js';
import { authMiddleware, authorizationMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware, getAllUsersController);
router.get('/:id', authMiddleware, getUserByIdController);
router.delete('/:id', authMiddleware, authorizationMiddleware, deleteUserController);

export default router;
