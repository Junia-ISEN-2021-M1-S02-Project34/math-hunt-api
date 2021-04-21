import express from 'express';
import controller from '../controllers/proposition.controller';
import authJwt from '../middleware/auth_jwt.middleware';

const router = express.Router();

router.post('/create/proposition', [authJwt.verifyToken, authJwt.admin], controller.createProposition);
router.get('/get/propositions', [authJwt.verifyToken], controller.getAllPropositions);
router.get('/get/proposition/:id', [authJwt.verifyToken], controller.getPropositionById);
router.get('/get/proposition/answer/:id', [authJwt.verifyToken], controller.getPropositionsByAnswerId);
router.put('/update/proposition/:id', [authJwt.verifyToken, authJwt.admin], controller.updateProposition);
router.delete('/delete/proposition/:id', [authJwt.verifyToken, authJwt.admin], controller.deleteProposition);

export default router;
