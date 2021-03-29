import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../config/swagger.json';

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;
