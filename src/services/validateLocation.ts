import express from 'express';
import isWithinGeofence from '../helpers/isWithinGeofence';
import sendEmail from '../helpers/sendEmail';
import ValidateLocationRequest from './requestTypes/validateLocationRequest';

export default async function validateLocation(req: ValidateLocationRequest, res: express.Response) {
  res.sendStatus(200);

  let checkWithinGeofence: boolean = true;

  try {
    checkWithinGeofence = await isWithinGeofence(req.body.rideId, req.body.coordinates)
  } catch (err) {
    console.log("error checking if within geofence. try again later...")
  }

  if (!checkWithinGeofence) {
    sendEmail(req.body.userId);
  }
};