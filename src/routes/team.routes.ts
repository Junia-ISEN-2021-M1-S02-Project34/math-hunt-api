import express from 'express';
import controller from '../controllers/team.controller';
import authJwt from '../middleware/auth_jwt.middleware';

const router = express.Router();

router.post('/create/teams', [authJwt.verifyToken, authJwt.admin], controller.createTeams);
router.get('/get/teams', [authJwt.verifyToken, authJwt.admin], controller.getAllTeams);
router.get('/get/team/:id', [authJwt.verifyToken, authJwt.self], controller.getTeamById);
router.get('/get/teams/game/:id', [authJwt.verifyToken, authJwt.admin], controller.getTeamsByGameId);
router.put('/update/team/:id', [authJwt.verifyToken, authJwt.self], controller.updateTeam);
router.put('/update/team/progression/:id', [authJwt.verifyToken, authJwt.self], controller.updateTeamProgression);
router.put('/update/team/used/hint/:id', [authJwt.verifyToken, authJwt.self], controller.updateTeamUsedHint);
router.put('/update/team/attemptsNumber/:id', [authJwt.verifyToken, authJwt.self], controller.updateAttemptsNumber);
router.delete('/delete/team/:id', [authJwt.verifyToken, authJwt.admin], controller.deleteTeam);

export default router;
