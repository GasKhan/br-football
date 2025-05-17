import { Router } from 'express';
import { login, logout, refreshTokens } from './auth.controllers';

export const router = Router();

router.post('/login', login);

router.post('/logout', logout);

router.post('/refresh', refreshTokens);
