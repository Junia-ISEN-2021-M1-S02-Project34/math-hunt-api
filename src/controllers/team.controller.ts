import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Team from '../models/team.model';
import Enigma from '../models/enigma.model';
import GeoGroup from '../models/geoGroup.model';
import { IEnigmaStatus } from '../interfaces/team.interface';
import IEnigma from '../interfaces/enigma.interface';
import IGeoGroup from '../interfaces/geoGroup.interface';

const createTeam = async (req: Request, res: Response): Promise<Response> => {
  const {
    gameId, gameName,
  } = req.body;

  return GeoGroup.find()
    .exec()
    .then((geoGroups) => Enigma.find()
      .exec()
      .then((enigmas) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const generatedProgression = generateRandomProgression(geoGroups, enigmas);
        const team = new Team({
          _id: new mongoose.Types.ObjectId(),
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          name: `${gameName}-team${generateRandomId()}`,
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          password: generatePassword(),
          gameId,
          progression: generatedProgression,
          currentEnigmaId: generatedProgression[0].enigmaId,
        });
        return team.save()
          .then((result) => res.status(201).json(result))
          .catch((e) => res.status(500).json({
            error: e.message,
            e,
          }));
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

const updateTeamProgression = (req: Request, res: Response): void => {
  const {
    finishedEnigma, enigmaScore, usedHintsIds,
  } = req.body;

  Team.findById(req.params.id)
    .exec()
    .then((resTeam) => {
      const index = resTeam.progression.findIndex(((pe) => pe.enigmaId === finishedEnigma));
      const editedTeam = resTeam;
      editedTeam.progression[index].score = enigmaScore;
      editedTeam.progression[index].done = true;
      editedTeam.progression[index].usedHintsIds = usedHintsIds;
      editedTeam.currentEnigmaId = editedTeam.progression[index].enigmaId;
      Team.updateOne({ _id: req.params.id }, editedTeam)
        .exec()
        .then(() => res.status(200).json({}));
    })
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
  createTeam, getTeamById, getAllTeams, getTeamsByGameId, updateTeam, updateTeamProgression, deleteTeam,
};

function generatePassword() {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function generateRandomId() {
  const length = 4;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function shuffle(array: Array<IGeoGroup>) {
  let currentIndex = array.length; let temporaryValue; let
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    // eslint-disable-next-line no-param-reassign
    array[currentIndex] = array[randomIndex];
    // eslint-disable-next-line no-param-reassign
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const generateRandomProgression = (geoGroups: IGeoGroup[], enigmas: IEnigma[]): IEnigmaStatus[] => {
  // eslint-disable-next-line no-underscore-dangle
  shuffle(geoGroups);
  const progressionToReturn = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const g of geoGroups) {
    // eslint-disable-next-line no-underscore-dangle
    const enigmasOfGeoGroup = enigmas.filter((e) => e.geoGroupId === g._id);
    enigmasOfGeoGroup.sort((a, b) => a.order - b.order);
    progressionToReturn.push({
      // eslint-disable-next-line no-underscore-dangle
      enigmaId: enigmasOfGeoGroup._id, done: false, score: 0, usedHintsIds: [],
    });
  }
  return progressionToReturn;
};
