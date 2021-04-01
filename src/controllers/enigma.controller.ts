import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Enigma from '../models/enigma.model';
import Team from '../models/team.model';

const createEnigma = async (req: Request, res: Response): Promise<Response> => {
  const {
    name, description, pictureUrl, question, positionX, positionY, scoreValue, isActive, geoGroupId,
  } = req.body;

  const enigma = new Enigma({
    _id: new mongoose.Types.ObjectId(),
    name,
    description,
    pictureUrl,
    question,
    positionX,
    positionY,
    scoreValue,
    isActive,
    geoGroupId,
  });

  return enigma.save()
    .then((result) => res.status(201).json(result))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getEnigmaById = (req: Request, res: Response): void => {
  Enigma.findById(req.params.id)
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getAllEnigmas = (req: Request, res: Response): void => {
  Enigma.find()
    .exec()
    .then((results) => res.status(200).json({
      enigmas: results,
      count: results.length,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getEnigmasByGeoGroupId = (req: Request, res: Response): void => {
  Team.find({ geoGroupId: req.params.id })
    .exec()
    .then((results) => res.status(200).json({
      enigmas: results,
      count: results.length,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const updateEnigma = (req: Request, res: Response): void => {
  const {
    name, description, pictureUrl, question, positionX, positionY, scoreValue, isActive, geoGroupId,
  } = req.body;

  const enigma = new Enigma({
    _id: req.params.id,
    name,
    description,
    pictureUrl,
    question,
    positionX,
    positionY,
    scoreValue,
    isActive,
    geoGroupId,
  });

  Enigma.updateOne({ _id: req.params.id }, enigma)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const deleteEnigma = (req: Request, res: Response): void => {
  Enigma.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default {
  createEnigma, getEnigmaById, getAllEnigmas, updateEnigma, getEnigmasByGeoGroupId, deleteEnigma,
};
