import { Router } from 'express';
import { getUsers, getStats } from '../controllers/user.controller';

const router = Router();

router.get('/',getUsers);
router.get('/stats', getStats);

export default router;