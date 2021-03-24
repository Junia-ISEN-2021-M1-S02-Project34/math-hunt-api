import express from 'express';
import controller from '../controllers/geoGroup.controller';

const router = express.Router();

router.post('/create/geoGroup', controller.createGeoGroup);
router.get('/get/geoGroups', controller.getAllGeoGroups);
router.get('/get/geoGroup/:id', controller.getGeoGroupById);
router.put('/update/geoGroup/:id', controller.updateGeoGroup);
router.delete('/delete/geoGroup/:id', controller.deleteGeoGroup);

export default router;
