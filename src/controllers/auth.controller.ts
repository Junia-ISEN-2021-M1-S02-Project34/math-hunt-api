import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model';
import Team from '../models/team.model';
import config from '../config/config';

const signInAdmin = (req: Request, res: Response): void => {
  const {
    username,
    password,
  } = req.body;

  const admin = new Admin({
    username,
    password,
  });

  Admin.find({ username: admin.username })
    .exec()
    .then((result) => {
      const passwordIsValid = bcrypt.compareSync(
        admin.password,
        result[0].password,
      );

      if (!passwordIsValid) {
        res.status(401).send({ error: 'Invalid password or login.' });
      }

      const token = jwt.sign({ username: result[0].username, role: 'admin' }, config.server.auth.secret, {
        expiresIn: 3600,
      });
      res.status(200).send({
        role: 'admin',
        username: result[0].username,
        accessToken: token,
      });
    })
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const signInTeam = (req: Request, res: Response): void => {
  const {
    username,
    password,
  } = req.body;

  const team = new Team({
    username,
    password,
  });

  Team.find({ username: team.username })
    .exec()
    .then((result) => {
      if (team.password !== result[0].password) {
        res.status(401).send({ error: 'Invalid password or login.' });
      }

      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ teamId: result[0]._id, role: 'team' }, config.server.auth.secret, {
        expiresIn: 36000, // 10 hours
      });
      res.status(200).send({
        role: 'team',
        // eslint-disable-next-line no-underscore-dangle
        teamId: result[0]._id,
        accessToken: token,
      });
    })
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default { signInAdmin, signInTeam };
