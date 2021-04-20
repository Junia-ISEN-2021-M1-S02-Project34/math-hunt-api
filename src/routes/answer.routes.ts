import express from 'express';
import controller from '../controllers/answer.controller';

import authJwt from '../middleware/auth_jwt.middleware';

const router = express.Router();

router.post('/create/answer', [authJwt.verifyToken], controller.createAnswer);
router.get('/get/answers', [authJwt.verifyToken], controller.getAllAnswers);
router.get('/get/answer/:id', [authJwt.verifyToken], controller.getAnswerById);
router.get('/get/answer/enigma/:id', [authJwt.verifyToken], controller.getAnswerByEnigmaId);
router.put('/update/answer/:id', [authJwt.verifyToken], controller.updateAnswer);
router.delete('/delete/answer/:id', [authJwt.verifyToken], controller.deleteAnswer);

export default router;
