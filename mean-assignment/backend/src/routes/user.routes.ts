import { Router } from 'express';
import { getUsers, getStats, createUser, getUserById, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

router.get('/',getUsers);
router.get('/stats', getStats);
router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


export default router;
