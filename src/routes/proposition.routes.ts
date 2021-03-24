import express from 'express';
import controller from '../controllers/proposition.controller';

const router = express.Router();

router.post('/create/proposition', controller.createProposition);
router.get('/get/propositions', controller.getAllPropositions);
router.get('/get/proposition/:id', controller.getPropositionById);
router.get('/get/proposition/answer/:id', controller.getPropositionsByAnswerId);
router.put('/update/proposition/:id', controller.updateProposition);
router.delete('/delete/proposition/:id', controller.deleteProposition);

export default router;
