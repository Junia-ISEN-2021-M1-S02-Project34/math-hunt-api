import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Team from '../models/team.model';

const createTeam = async (req: Request, res: Response): Promise<Response> => {
  const {
    username, password, gameId, progression,
  } = req.body;

  const team = new Team({
    _id: new mongoose.Types.ObjectId(),
    username,
    password,
    gameId,
    progression,
    currentEnigmaId: progression[0].enigmaId,
  });

  return team.save()
    .then((result) => res.status(201).json(result))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getTeamById = (req: Request, res: Response): void => {
  Team.findById(req.params.id)
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getAllTeams = (req: Request, res: Response): void => {
  Team.find()
    .exec()
    .then((results) => res.status(200).json({
      teams: results,
      count: results.length,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getTeamsByGameId = (req: Request, res: Response): void => {
  Team.find({ gameId: req.params.id })
    .exec()
    .then((results) => res.status(200).json({
      teams: results,
      count: results.length,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const updateTeam = (req: Request, res: Response): void => {
  const {
    score,
  } = req.body;

  const team = new Team({
    _id: req.params.id,
    score,
  });

  Team.updateOne({ _id: req.params.id }, team)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const deleteTeam = (req: Request, res: Response): void => {
  Team.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default {
  createTeam, getTeamById, getAllTeams, getTeamsByGameId, updateTeam, deleteTeam,
};
