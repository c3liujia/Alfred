import AWS from 'aws-sdk';

AWS.config.update({
  region: "us-east-1"
});

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

export default async function getValidGeofenceCodes(rideId: string) {
  const params = {
      TableName : "RideToGeofences", 
      KeyConditionExpression: 'rideId = :id',
      ExpressionAttributeValues: {
        ':id': rideId
      }
  };

  try {
    const data = await docClient.query(params).promise();
    return data.Items[0] && data.Items[0].geofenceCodes;
  } catch (e) {
    console.warn('Querying for geofence failed for code ', rideId);
    return [];
  }
}