
import * as geolib from 'geolib';

import Coordinates from '../interfaces/coordinates';
import getValidGeofenceCodes from './getValidGeofenceCodes';
import retrieveCoordinatesFromGeofencecode from './retrieveCoordinatesFromGeofenceCode';


function checkCoordinatesWithinBoundary(coordinates: Coordinates, boundary:Array<Coordinates>): boolean {
  const isCoordinatesWithinBoundary: boolean = geolib.isPointInPolygon(coordinates, boundary);
  return isCoordinatesWithinBoundary;
}

export default async function isWithinGeofence(rideId:string, coordinates:Coordinates) {
  const validGeofenceCodes = await getValidGeofenceCodes(rideId);
  let isCoordinatesWithinBoundary: boolean = false;
  Boolean(validGeofenceCodes.length) && validGeofenceCodes.forEach((geofenceCode:string) => {
    const boundary: Array<Coordinates> = retrieveCoordinatesFromGeofencecode(geofenceCode)
    isCoordinatesWithinBoundary = isCoordinatesWithinBoundary || checkCoordinatesWithinBoundary (coordinates, boundary)
  });
  return Boolean(isCoordinatesWithinBoundary);
};
