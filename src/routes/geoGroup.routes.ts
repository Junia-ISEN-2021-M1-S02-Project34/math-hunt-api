import express from 'express';
import controller from '../controllers/geoGroup.controller';
import authJwt from '../middleware/auth_jwt.middleware';

const router = express.Router();

router.post('/create/geoGroup', [authJwt.verifyToken, authJwt.admin], controller.createGeoGroup);
router.get('/get/geoGroups', [authJwt.verifyToken], controller.getAllGeoGroups);
router.get('/get/geoGroup/:id', [authJwt.verifyToken], controller.getGeoGroupById);
router.put('/update/geoGroup/:id', [authJwt.verifyToken, authJwt.admin], controller.updateGeoGroup);
router.delete('/delete/geoGroup/:id', [authJwt.verifyToken, authJwt.admin], controller.deleteGeoGroup);

export default router;
