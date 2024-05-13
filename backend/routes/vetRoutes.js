import express, { Router } from 'express';
import { register, profile, confirmToken, authenticate } from '../controllers/vetController.js';

const router = express.Router();

router.post('/', register);
router.get('/profile', profile);
router.get('/confirm/:token', confirmToken);
router.post('/login', authenticate);



export default router;