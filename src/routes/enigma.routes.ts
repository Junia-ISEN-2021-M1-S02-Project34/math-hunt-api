import express from 'express';
import controller from '../controllers/enigma.controller';
import authJwt from '../middleware/auth_jwt.middleware';

const router = express.Router();

router.post('/create/enigma', [authJwt.verifyToken, authJwt.admin], controller.createEnigma);
router.get('/get/enigmas', [authJwt.verifyToken], controller.getAllEnigmas);
router.get('/get/enigma/:id', [authJwt.verifyToken], controller.getEnigmaById);
router.get('/get/full/enigma/:id', [authJwt.verifyToken], controller.getFullEnigmaById);
router.get('/get/enigmas/geoGroup/:id', [authJwt.verifyToken], controller.getEnigmasByGeoGroupId);
router.put('/update/enigma/:id', [authJwt.verifyToken, authJwt.admin], controller.updateEnigma);
router.delete('/delete/enigma/:id', [authJwt.verifyToken, authJwt.admin], controller.deleteEnigma);

export default router;
