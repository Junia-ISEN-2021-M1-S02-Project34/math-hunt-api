import { Request, Response } from 'express';
import mongoose from 'mongoose';
import GeoGroup from '../models/geoGroup.model';

const createGeoGroup = async (req: Request, res: Response): Promise<Response> => {
  const {
    name, positionX, positionY, radius, pictureUrl,
  } = req.body;

  const geoGroup = new GeoGroup({
    _id: new mongoose.Types.ObjectId(),
    name,
    positionX,
    positionY,
    radius,
    pictureUrl,
  });

  return geoGroup.save()
    .then((result) => res.status(201).json(result))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getGeoGroupById = (req: Request, res: Response): void => {
  GeoGroup.findById(req.params.id)
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const getAllGeoGroups = (req: Request, res: Response): void => {
  GeoGroup.find()
    .exec()
    .then((results) => res.status(200).json({
      geoGroups: results,
      count: results.length,
    }))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const updateGeoGroup = (req: Request, res: Response): void => {
  const {
    name, positionX, positionY, radius, pictureUrl,
  } = req.body;

  const geoGroup = new GeoGroup({
    _id: req.params.id,
    name,
    positionX,
    positionY,
    radius,
    pictureUrl,
  });

  GeoGroup.updateOne({ _id: req.params.id }, geoGroup)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

const deleteGeoGroup = (req: Request, res: Response): void => {
  GeoGroup.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.status(200).json({}))
    .catch((e) => res.status(500).json({
      error: e.message,
      e,
    }));
};

export default {
  createGeoGroup, getGeoGroupById, getAllGeoGroups, updateGeoGroup, deleteGeoGroup,
};
