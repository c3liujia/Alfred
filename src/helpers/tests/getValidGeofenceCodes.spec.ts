import getValidGeofenceCodes from '../getValidGeofenceCodes';
import * as AWS from 'aws-sdk';
import { mocked } from 'ts-jest/utils';

jest.mock('aws-sdk', () => {
  const documentClientInstance = {
    query: jest.fn()
  };

  const mockDocumentClient= jest.fn(() => documentClientInstance);

  return { 
    config: {
      update: jest.fn()
    },
    DynamoDB: {
      DocumentClient: mockDocumentClient
    } 
  };
});

describe('getValidGeofenceCodes', () => {
  const mockRideId: string = 'Ride1';
  const mockQueryResponse = {
    Items: [
      {
        geofenceCodes: ["Code1", "Code2"]
      },
      {
        geofenceCodes: ["Code3", "Code4"]
      }
    ]
  }


  test('when query returns data, then geofence of first data item is returned', async () => {
    const documentClientInstance = new AWS.DynamoDB.DocumentClient();
    mocked(documentClientInstance.query).mockImplementationOnce(
      (): any => {
        return {
          promise: () => mockQueryResponse
        };
      },
    );
    const geofenceCodes = await getValidGeofenceCodes(mockRideId);
    expect(geofenceCodes).toEqual(mockQueryResponse.Items[0].geofenceCodes);
  });

  test('when query fails, then empty list is returned', async () => {
    const documentClientInstance = new AWS.DynamoDB.DocumentClient();
    mocked(documentClientInstance.query).mockImplementationOnce(
      (): any => {
        throw(new Error("whoopsie"))
      },
    );
    const geofenceCodes = await getValidGeofenceCodes(mockRideId);
    expect(geofenceCodes).toEqual([]);
  });
});