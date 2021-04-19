import express from 'express';
import controller from '../controllers/team.controller';

const router = express.Router();

router.post('/create/teams', controller.createTeams);
router.get('/get/teams', controller.getAllTeams);
router.get('/get/team/:id', controller.getTeamById);
router.get('/get/teams/game/:id', controller.getTeamsByGameId);
router.put('/update/team/:id', controller.updateTeam);
router.put('/update/team/progression/:id', controller.updateTeamProgression);
router.put('/update/team/used/hint/:id', controller.updateTeamUsedHint);
router.put('/update/team/attemptsNumber/:id', controller.updateAttemptsNumber);
router.delete('/delete/team/:id', controller.deleteTeam);

export default router;
