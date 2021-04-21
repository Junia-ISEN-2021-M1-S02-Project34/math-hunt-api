import express from 'express';
import controller from '../controllers/auth.controller';

const router = express.Router();

router.post('/sign-in/admin', controller.signInAdmin);
router.post('/sign-in/team', controller.signInTeam);

export default router;
