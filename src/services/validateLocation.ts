import express from 'express';
import { isWithinGeofence } from '../helpers/isWithinGeofence';
import { sendEmail } from '../helpers/sendEmail';
import ValidateLocationRequest from './requestTypes/validateLocationRequest';

export default async function validateLocation(req: ValidateLocationRequest, res: express.Response) {
  res.sendStatus(200);

  const userId: string = req.body.userId;
  const rideId: string = req.body.rideId;
  const coordinates: string = req.body.coordinates;


  let checkWithinGeofence: boolean = true;

  try {
    checkWithinGeofence = await isWithinGeofence(rideId, coordinates)
  } catch (err) {
    console.log("error checking if within geofence. try again later...")
  }
  
  if (!checkWithinGeofence) {
    sendEmail(userId);
  }
};