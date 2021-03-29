// src/routes/index.ts

import express from 'express';
import SwaggerRoutes from './swagger.routes';
import GameRoutes from './game.routes';
import TeamRoutes from './team.routes';
import GeoGroupRoutes from './geoGroup.routes';
import EnigmaRoutes from './enigma.routes';
import AnswerRoutes from './answer.routes';
import HintRoutes from './hint.routes';
import PropositionRoutes from './proposition.routes';
import AdminRoutes from './admin.routes';

const router = express.Router();

router.use('/api-docs', SwaggerRoutes);

router.use('/games', GameRoutes);
router.use('/teams', TeamRoutes);
router.use('/geoGroups', GeoGroupRoutes);
router.use('/enigmas', EnigmaRoutes);
router.use('/answers', AnswerRoutes);
router.use('/hints', HintRoutes);
router.use('/propositions', PropositionRoutes);
router.use('/admins', AdminRoutes);

export default router;
