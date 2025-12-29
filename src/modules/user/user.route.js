import express from 'express';
import { getAllUsersController, getUserByIdController } from './user.controller.js';

const router = express.Router();
router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);

export default router;
