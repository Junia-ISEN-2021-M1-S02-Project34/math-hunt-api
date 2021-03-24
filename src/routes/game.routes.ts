import express from 'express';
import controller from '../controllers/game.controller';

const router = express.Router();

router.post('/create/game', controller.createGame);
router.get('/get/games', controller.getAllGames);
router.get('/get/game/:id', controller.getGameById);
router.put('/update/game/:id', controller.updateGame);
router.delete('/delete/game/:id', controller.deleteGame);

router.put('/start/game/:id', controller.startGame);

export default router;
