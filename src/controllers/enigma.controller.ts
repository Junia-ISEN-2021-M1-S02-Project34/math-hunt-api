import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Enigma from '../models/enigma.model';
import Team from '../models/team.model';
import Answer from '../models/answer.model';
import Hint from '../models/hint.model';
import Proposition from '../models/proposition.model';

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

const getFullEnigmaById = (req: Request, res: Response): void => {
  Enigma.findById(req.params.id)
    .exec()
    .then((enigma) => {
      Answer.find({ enigmaId: req.params.id })
        .exec()
        .then((answer) => {
          Proposition.find({ answerId: answer[0].id })
            .exec()
            .then((propositions) => {
              res.status(200).json({ enigma, answer: answer[0], propositions });
            });
        });
    })
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
    .then(() => {
      Hint.deleteMany({ enigmaId: req.params.id })
        .exec()
        .then(() => {
          Answer.find({ enigmaId: req.params.id })
            .exec()
            .then((answer) => {
              Answer.deleteOne({ enigmaId: req.params.id })
                .exec()
                .then(() => {
                  // eslint-disable-next-line no-underscore-dangle
                  Proposition.deleteMany({ answerId: answer._id })
                    .exec()
                    .then(() => {
                      res.status(200).json({});
                    });
                });
            });
        });
    })
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default {
  createEnigma, getEnigmaById, getFullEnigmaById, getAllEnigmas, updateEnigma, getEnigmasByGeoGroupId, deleteEnigma,
};
