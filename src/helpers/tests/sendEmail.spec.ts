import sendEmail from '../sendEmail';
import * as AWS from 'aws-sdk';
import { mocked } from 'ts-jest/utils';

jest.mock('aws-sdk', () => {
  const lambdaInstance = {
    invoke: jest.fn(),
  };

  const mockLambda = jest.fn(() => lambdaInstance);

  return { 
    config: {
      update: jest.fn()
    },
    Lambda: mockLambda 
  };
});

describe('sendEmail', () => {
  test('when called, invokes lambda with correct params and message is logged', async () => {
    const lambdaInstance = new AWS.Lambda();
    await sendEmail('user1');
    expect(lambdaInstance.invoke).toHaveBeenCalledWith({
      FunctionName: 'SendAlertEmail',
      Payload: `{ "userId": "user1" }`
    }, expect.any(Function));
  });
});