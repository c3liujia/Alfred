import express from 'express';
import { isWithinGeofence } from '../helpers/isWithinGeofence';
import { sendEmail } from '../helpers/sendEmail';
import ValidateLocationRequest from './requestTypes/validateLocationRequest';

export default async function validateLocation(req: ValidateLocationRequest, res: express.Response) {
  res.sendStatus(200);

  const userId: string = req.userId;
  const rideId: string = req.rideId;
  const coordinates: string = req.coordinates;

  if (!isWithinGeofence(rideId, coordinates)) {
    sendEmail(userId);
  }
};