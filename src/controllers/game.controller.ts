import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Game from '../models/game.model';
import Team from '../models/team.model';
import ITeam from '../interfaces/team.interface';

const createGame = async (req: Request, res: Response): Promise<void> => {
  const {
    name, duration,
  } = req.body;

  const game = new Game({
    _id: new mongoose.Types.ObjectId(),
    name,
    duration,
  });

  game.save()
    .then((createdGame) => {
      res.status(200).json(createdGame);
    })
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getGameById = (req: Request, res: Response): void => {
  Game.findById(req.params.id)
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getAllGames = (req: Request, res: Response): void => {
  Game.find()
    .exec()
    .then((results) => res.status(200).json({
      games: results,
      count: results.length,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const updateGame = (req: Request, res: Response): void => {
  const {
    name, duration,
  } = req.body;

  const game = new Game({
    _id: req.params.id,
    name,
    duration,
  });

  Game.updateOne({ _id: req.params.id }, game)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const deleteGame = (req: Request, res: Response): void => {
  Game.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => {
      Team.deleteMany({ gameId: req.params.id })
        .exec()
        .then(() => {
          res.status(200).json({});
        });
    })
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const startGame = (req: Request, res: Response): void => {
  Game.findById(req.params.id)
    .exec()
    .then((gameRes) => {
      let game = new Game();
      if (gameRes.startDate) {
        game = new Game({
          _id: req.params.id,
          isStarted: true,
        });
      } else {
        game = new Game({
          _id: req.params.id,
          startDate: new Date(),
          isStarted: true,
        });
      }
      Game.updateOne({ _id: req.params.id }, game)
        .exec()
        .then(() => res.status(200).json({}))
        .catch((e) => res.status(500).json({
          error: e.message,
          e,
        }));
    })
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const stopGame = (req: Request, res: Response): void => {
  const game = new Game({
    _id: req.params.id,
    isStarted: false,
  });

  Game.updateOne({ _id: req.params.id }, game)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getRanking = (req: Request, res: Response): void => {
  Team.find({ gameId: req.params.id }, {
    _id: 1, username: 1, score: 1, gameFinished: 1,
  })
    .exec()
    .then((results) => {
      results.sort((a: ITeam, b: ITeam) => {
        if (a.score > b.score) { return -1; }
        if (a.score < b.score) { return 1; }
        return 0;
      });
      res.status(200).json({
        teams: results,
        count: results.length,
      });
    })
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default {
  createGame, getGameById, getAllGames, updateGame, deleteGame, startGame, stopGame, getRanking,
};
