import express from 'express';
import controller from '../controllers/admin.controller';
import authJwt from '../middleware/auth_jwt.middleware';

const router = express.Router();

router.post('/create/admin', [authJwt.verifyToken, authJwt.admin], controller.createAdmin);
router.put('/update/admin/:username', [authJwt.verifyToken, authJwt.admin], controller.updateAdmin);

export default router;
