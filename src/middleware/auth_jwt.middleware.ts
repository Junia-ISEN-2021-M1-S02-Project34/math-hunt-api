// app/middleware/auth_jwt.middleware.js

import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import { IJwt } from '../interfaces/auth.interface';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    res.status(403).json({ error: 'No token provided!' });
  }

  jwt.verify(token, config.server.auth.secret, (err, decoded: IJwt) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized!' });
    }
    res.locals.role = decoded.role;
    res.locals.username = decoded.username;
    res.locals.teamId = decoded.teamId;
    next();
    return true;
  });
};

const self = (req: Request, res: Response, next: NextFunction): void => {
  if (res.locals.role === 'admin') {
    next();
    return;
  }
  if (res.locals.teamId === req.params.id) {
    next();
    return;
  }
  res.status(403).send({ error: 'You don\'t have rights to access this resource!' });
};

const admin = (req: Request, res: Response, next: NextFunction): void => {
  if (res.locals.role === 'admin') {
    next();
    return;
  }
  res.status(403).send({ error: 'You don\'t have rights to access this resource!' });
};

export default {
  verifyToken,
  self,
  admin,
};
