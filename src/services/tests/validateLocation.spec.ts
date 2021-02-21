
import express from 'express';
import { isWithinGeofence } from '../../helpers/isWithinGeofence';
import { sendEmail } from '../../helpers/sendEmail';
import validateLocation from '../validatelocation';

jest.mock('../../helpers/isWithinGeofence');
jest.mock('../../helpers/sendEmail');

const isWithinGeofenceMock = isWithinGeofence as jest.MockedFunction<typeof isWithinGeofence>;
const sendEmailMock = sendEmail as jest.MockedFunction<typeof sendEmail>;

describe('validateLocation', () => {
  const req: any = {
    body: {
      userId: 'user1',
      rideId: 'rideNo1',
      coordinates: '0 0'
    }
  };

  const res: any = {
    sendStatus: jest.fn()
  };
  
  beforeEach(() => {
    isWithinGeofenceMock.mockClear();
    sendEmailMock.mockClear();
  });

  test('responds with 200 code', async () => {
    await validateLocation(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  })

  test('POST: when validating geofence is truthy, sendEmail is not triggered', async () => {
    isWithinGeofenceMock.mockResolvedValue(true)
    await validateLocation(req, res);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  test('POST: when validating geofence is falsy, sendEmail is triggered', async () => {
    isWithinGeofenceMock.mockResolvedValue(false)
    await validateLocation(req, res);
    expect(sendEmailMock).toHaveBeenCalledWith('user1');
  });

  test('POST: when error occurs from geofence fails, sendEmail is not triggered', async () => {
    isWithinGeofenceMock.mockRejectedValue('')
    await validateLocation(req, res);
    expect(sendEmailMock).not.toHaveBeenCalled();
  });
});