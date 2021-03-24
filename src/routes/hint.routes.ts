import express from 'express';
import controller from '../controllers/hint.controller';

const router = express.Router();

router.post('/create/hint', controller.createHint);
router.get('/get/hints', controller.getAllHints);
router.get('/get/hint/:id', controller.getHintById);
router.get('/get/hint/enigma/:id', controller.getHintsByEnigmaId);
router.put('/update/hint/:id', controller.updateHint);
router.delete('/delete/hint/:id', controller.deleteHint);

export default router;
