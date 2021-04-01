import express from 'express';
import controller from '../controllers/enigma.controller';

const router = express.Router();

router.post('/create/enigma', controller.createEnigma);
router.get('/get/enigmas', controller.getAllEnigmas);
router.get('/get/enigma/:id', controller.getEnigmaById);
router.get('/get/full/enigma/:id', controller.getFullEnigmaById);
router.get('/get/enigmas/geoGroup/:id', controller.getEnigmasByGeoGroupId);
router.put('/update/enigma/:id', controller.updateEnigma);
router.delete('/delete/enigma/:id', controller.deleteEnigma);

export default router;
