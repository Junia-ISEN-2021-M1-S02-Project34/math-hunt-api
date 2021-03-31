import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Hint from '../models/hint.model';

const createHint = async (req: Request, res: Response): Promise<Response> => {
  const {
    name, text, rank, penalty, propositionToRemove, enigmaId,
  } = req.body;

  const hint = new Hint({
    _id: new mongoose.Types.ObjectId(),
    name,
    text,
    rank,
    penalty,
    propositionToRemove,
    enigmaId,
  });

  return hint.save()
    .then((result) => res.status(201).json({
      result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getHintById = (req: Request, res: Response): void => {
  Hint.findById(req.params.id)
    .exec()
    .then((result) => res.status(200).json({
      result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getAllHints = (req: Request, res: Response): void => {
  Hint.find()
    .exec()
    .then((results) => res.status(200).json({
      hints: results,
      count: results.length,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getHintsByEnigmaId = (req: Request, res: Response): void => {
  Hint.find({ enigmaId: req.params.id })
    .exec()
    .then((result) => res.status(200).json({
      result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const updateHint = (req: Request, res: Response): void => {
  const {
    name, text, rank, penalty, propositionToRemove,
  } = req.body;

  const hint = new Hint({
    _id: req.params.id,
    name,
    text,
    rank,
    penalty,
    propositionToRemove,
  });

  Hint.updateOne({ _id: req.params.id }, hint)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const deleteHint = (req: Request, res: Response): void => {
  Hint.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default {
  createHint, getHintById, getAllHints, getHintsByEnigmaId, updateHint, deleteHint,
};
