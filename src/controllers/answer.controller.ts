import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Answer from '../models/answer.model';

const createAnswer = async (req: Request, res: Response): Promise<Response> => {
  const {
    enigmaId, isMcq, solution, attemptsNumber,
  } = req.body;

  const answer = new Answer({
    _id: new mongoose.Types.ObjectId(),
    enigmaId,
    isMcq,
    solution,
    attemptsNumber,
  });

  return answer.save()
    .then((result) => res.status(201).json({
      result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getAnswerById = (req: Request, res: Response): void => {
  Answer.findById(req.params.id)
    .exec()
    .then((result) => res.status(200).json({
      result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getAllAnswers = (req: Request, res: Response): void => {
  Answer.find()
    .exec()
    .then((results) => res.status(200).json({
      answers: results,
      count: results.length,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getAnswerByEnigmaId = (req: Request, res: Response): void => {
  Answer.find({ enigmaId: req.params.id })
    .exec()
    .then((result) => res.status(200).json({
      result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const updateAnswer = (req: Request, res: Response): void => {
  const {
    isMcq, solution, attemptsNumber,
  } = req.body;

  const answer = new Answer({
    _id: req.params.id,
    isMcq,
    solution,
    attemptsNumber,
  });

  Answer.updateOne({ _id: req.params.id }, answer)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const deleteAnswer = (req: Request, res: Response): void => {
  Answer.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default {
  createAnswer, getAnswerById, getAllAnswers, getAnswerByEnigmaId, updateAnswer, deleteAnswer,
};
