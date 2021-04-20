import express from 'express';
import controller from '../controllers/team.controller';
import authJwt from '../middleware/auth_jwt.middleware';

const router = express.Router();

router.post('/create/teams', [authJwt.verifyToken], controller.createTeams);
router.get('/get/teams', [authJwt.verifyToken], controller.getAllTeams);
router.get('/get/team/:id', [authJwt.verifyToken], controller.getTeamById);
router.get('/get/teams/game/:id', [authJwt.verifyToken], controller.getTeamsByGameId);
router.put('/update/team/:id', [authJwt.verifyToken], controller.updateTeam);
router.put('/update/team/progression/:id', [authJwt.verifyToken], controller.updateTeamProgression);
router.put('/update/team/used/hint/:id', [authJwt.verifyToken], controller.updateTeamUsedHint);
router.put('/update/team/attemptsNumber/:id', [authJwt.verifyToken], controller.updateAttemptsNumber);
router.delete('/delete/team/:id', [authJwt.verifyToken], controller.deleteTeam);

export default router;
