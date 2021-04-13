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
        const generatedProgression = generateRandomProgression(geoGroups, enigmas) as IEnigmaStatus[];
        const team = new Team({
          _id: new mongoose.Types.ObjectId(),
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          username: `${gameName}-team${generateRandomId()}`,
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          password: generatePassword(),
          gameId,
          progression: generatedProgression,
          currentEnigmaId: generatedProgression[0].enigmasProgression[0].enigmaId,
          currentGeoGroupId: generatedProgression[0].geoGroupId,
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

/* const updateTeamProgression = (req: Request, res: Response): void => {
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
      editedTeam.currentEnigmaId = editedTeam.progression[index + 1].enigmaId;
      editedTeam.currentGeoGroupId = editedTeam.progression[index + 1].geoGroupId;
      editedTeam.score += enigmaScore;
      Team.findByIdAndUpdate(req.params.id, editedTeam, { new: true })
        .exec()
        .then((result) => res.status(200).json(result));
    })
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
}; */

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
  createTeam,
  getTeamById,
  getAllTeams,
  getTeamsByGameId,
  updateTeam,
  // updateTeamProgression,
  deleteTeam,
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
    const enigmasOfGeoGroup = enigmas.filter((e) => e.geoGroupId.toString() === g._id.toString());
    enigmasOfGeoGroup.sort((a, b) => a.order - b.order);
    const enigmasOfProgression = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const e of enigmasOfGeoGroup) {
      enigmasOfProgression.push({
        // eslint-disable-next-line no-underscore-dangle
        enigmaId: e._id,
        enigmaName: e.name,
        done: false,
        score: 0,
        scoreValue: e.scoreValue,
        usedHintsIds: null,
      });
    }
    progressionToReturn.push({
      // eslint-disable-next-line no-underscore-dangle
      geoGroupId: g._id,
      geoGroupName: g.name,
      enigmasProgression: enigmasOfProgression,
      geoGroupScore: 0,
      geoGroupScoreValue: enigmasOfProgression.reduce((prev, cur) => prev + cur.scoreValue, 0),
    } as IEnigmaStatus);
  }
  return progressionToReturn;
};
