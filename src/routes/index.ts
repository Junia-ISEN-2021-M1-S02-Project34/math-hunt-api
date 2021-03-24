// src/routes/index.ts

import express from 'express';
import GameRoutes from './game.routes';
import TeamRoutes from './team.routes';
import GeoGroupRoutes from './geoGroup.routes';
import EnigmaRoutes from './enigma.routes';
import AnswerRoutes from './answer.routes';

const router = express.Router();

router.use('/games', GameRoutes);
router.use('/teams', TeamRoutes);
router.use('/geoGroups', GeoGroupRoutes);
router.use('/enigmas', EnigmaRoutes);
router.use('/answers', AnswerRoutes);

export default router;
