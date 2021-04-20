import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model';
import config from '../config/config';

const createAdmin = async (req: Request, res: Response): Promise<Response> => {
  const {
    name, password,
  } = req.body;

  const admin = new Admin({
    name,
    password: bcrypt.hashSync(password, config.server.auth.salt_rounds),
  });

  return admin.save()
    .then((result) => res.status(201).json({
      result,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const updateAdmin = (req: Request, res: Response): void => {
  const {
    password,
  } = req.body;

  const admin = new Admin({
    username: req.params.username,
    password,
  });

  Admin.updateOne({ username: req.params.username }, admin)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default {
  createAdmin, updateAdmin,
};
