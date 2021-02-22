import isWithinGeofence from '../isWithinGeofence';
import Coordinates from '../../interfaces/coordinates';
import getValidGeofenceCodes from '../getValidGeofenceCodes';
import retrieveCoordinatesFromGeofencecode from '../retrieveCoordinatesFromGeofenceCode';

jest.mock('../getValidGeofenceCodes');
jest.mock('../retrieveCoordinatesFromGeofenceCode');

const getValidGeofenceCodesMock = getValidGeofenceCodes as jest.MockedFunction<typeof getValidGeofenceCodes>;
const retrieveCoordinatesFromGeofencecodeMock = retrieveCoordinatesFromGeofencecode as jest.MockedFunction<typeof retrieveCoordinatesFromGeofencecode>;

describe('isWithinGeofence', () => {
  beforeEach(() => {
    getValidGeofenceCodesMock.mockClear();
    retrieveCoordinatesFromGeofencecodeMock.mockClear();
  });

  const boundary: Array<Coordinates> = [
    {
      longitude: '0',
      latitude: '0'
    },
    {
      longitude: '0',
      latitude: '1'
    },
    {
      longitude: '1',
      latitude: '0'
    },
    {
      longitude: '0',
      latitude: '0'
    }
  ];

  test('returns truthy when rideId is within boundary', async () => {
    const coordinate: Coordinates = {
      longitude: '0',
      latitude: '0'
    };
    getValidGeofenceCodesMock.mockResolvedValue(["E05000001"]);
    retrieveCoordinatesFromGeofencecodeMock.mockReturnValue(boundary);
    const res = await isWithinGeofence('rideId1', coordinate);
    expect(res).toBe(true)
  });

  test('returns falsy when rideId is outside boundary', async () => {
    const coordinate: Coordinates = {
      longitude: '-0.5',
      latitude: '-0.5'
    };
    getValidGeofenceCodesMock.mockResolvedValue(["E05000001"]);
    retrieveCoordinatesFromGeofencecodeMock.mockReturnValue(boundary);
    const res = await isWithinGeofence('rideId1', coordinate);
    expect(res).toBe(false)
  });
});