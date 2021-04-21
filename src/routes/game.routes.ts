import express from 'express';
import controller from '../controllers/game.controller';
import authJwt from '../middleware/auth_jwt.middleware';

const router = express.Router();

router.post('/create/game', [authJwt.verifyToken, authJwt.admin], controller.createGame);
router.get('/get/games', [authJwt.verifyToken, authJwt.admin], controller.getAllGames);
router.get('/get/game/:id', [authJwt.verifyToken], controller.getGameById);
router.get('/get/teams/ranking/game/:id', [authJwt.verifyToken], controller.getRanking);
router.put('/update/game/:id', [authJwt.verifyToken, authJwt.admin], controller.updateGame);
router.delete('/delete/game/:id', [authJwt.verifyToken, authJwt.admin], controller.deleteGame);

router.put('/start/game/:id', [authJwt.verifyToken, authJwt.admin], controller.startGame);

export default router;
