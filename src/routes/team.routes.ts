import express from 'express';
import controller from '../controllers/team.controller';

const router = express.Router();

router.post('/create/team', controller.createTeam);
router.get('/get/teams', controller.getAllTeams);
router.get('/get/team/:id', controller.getTeamById);
router.get('/get/teams/game/:id', controller.getTeamsByGameId);
router.put('/update/team/:id', controller.updateTeam);
router.post('/update/team/progression/:id', controller.updateTeamProgression);
router.post('/update/team/used/hint/:id', controller.updateTeamUsedHint);
router.delete('/delete/team/:id', controller.deleteTeam);

export default router;
