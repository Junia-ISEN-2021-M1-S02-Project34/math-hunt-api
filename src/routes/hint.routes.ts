import express from 'express';
import controller from '../controllers/hint.controller';
import authJwt from '../middleware/auth_jwt.middleware';

const router = express.Router();

router.post('/create/hint', [authJwt.verifyToken, authJwt.admin], controller.createHint);
router.get('/get/hints', [authJwt.verifyToken], controller.getAllHints);
router.get('/get/hint/:id', [authJwt.verifyToken], controller.getHintById);
router.get('/get/hints/enigma/:id', [authJwt.verifyToken], controller.getHintsByEnigmaId);
router.put('/update/hint/:id', [authJwt.verifyToken, authJwt.admin], controller.updateHint);
router.delete('/delete/hint/:id', [authJwt.verifyToken, authJwt.admin], controller.deleteHint);

export default router;
