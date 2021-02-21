import express from 'express';

export default interface ValidateLocationRequest extends express.Request { 
  body: {
    userId: string,
    rideId: string,
    coordinates: string
  }
};