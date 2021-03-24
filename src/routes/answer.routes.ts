import express from 'express';
import controller from '../controllers/answer.controller';

const router = express.Router();

router.post('/create/answer', controller.createAnswer);
router.get('/get/answers', controller.getAllAnswers);
router.get('/get/answer/:id', controller.getAnswerById);
router.get('/get/answer/enigma/:id', controller.getAnswerByEnigmaId);
router.put('/update/answer/:id', controller.updateAnswer);
router.delete('/delete/answer/:id', controller.deleteAnswer);

export default router;
