import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Proposition from '../models/proposition.model';

const createProposition = async (req: Request, res: Response): Promise<Response> => {
  const {
    text, answerId,
  } = req.body;

  const proposition = new Proposition({
    _id: new mongoose.Types.ObjectId(),
    text,
    answerId,
  });

  return proposition.save()
    .then((result) => res.status(201).json({
      proposition: result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getPropositionById = (req: Request, res: Response): void => {
  Proposition.findById(req.params.id)
    .exec()
    .then((result) => res.status(200).json({
      proposition: result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getAllPropositions = (req: Request, res: Response): void => {
  Proposition.find()
    .exec()
    .then((results) => res.status(200).json({
      propositions: results,
      count: results.length,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getPropositionsByAnswerId = (req: Request, res: Response): void => {
  Proposition.find({ answerId: req.params.id })
    .exec()
    .then((result) => res.status(200).json({
      proposition: result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const updateProposition = (req: Request, res: Response): void => {
  const {
    text, answerId,
  } = req.body;

  const proposition = new Proposition({
    _id: req.params.id,
    text,
    answerId,
  });

  Proposition.updateOne({ _id: req.params.id }, proposition)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const deleteProposition = (req: Request, res: Response): void => {
  Proposition.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default {
  createProposition,
  getPropositionById,
  getAllPropositions,
  getPropositionsByAnswerId,
  updateProposition,
  deleteProposition,
};
