import express from 'express';

export default interface ValidateLocationRequest extends express.Request { 
  userId: string,
  rideId: string,
  coordinates: string
};