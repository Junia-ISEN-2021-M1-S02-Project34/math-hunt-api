import express from 'express';
import controller from '../controllers/admin.controller';

const router = express.Router();

router.post('/create/admin', controller.createAdmin);
router.put('/update/admin/:username', controller.updateAdmin);

export default router;
