import http from 'http';
import express, { Response } from 'express';
import mongoose from 'mongoose';
import logging from './config/logging';
import config from './config/config';
import routes from './routes';

const NAMESPACE = 'Server';
const router = express();

/** Connect to MongoDB */
mongoose.connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info(NAMESPACE, 'Connected to MongoDB !');
  })
  .catch((e) => {
    logging.error(NAMESPACE, e.message, e);
  });

/** Logging the request */
router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`);
  });

  next();
});

/** Parse the request */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Rules of the API */
router.use((req, res, next): Response|void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,DELETE,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, x-access-token, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  return next();
});

/** Routes */
router.use('/api', routes);

/** Error Handling */
router.use((req, res) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message,
  });
});

/** Create the server */
const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => {
  logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`);
});
