import AWS from 'aws-sdk';

AWS.config.update({
  region: "us-east-1"
});

AWS.config.logger = console;
const docClient = new AWS.DynamoDB.DocumentClient();

// const validRideGeofenceCodes: Array<string> =  [ 'E05000001', 'E05000002' ]

async function getValidGeofenceCodes(rideId: string) {
  console.log("Querying for geofences for rideId ", rideId);
  
  var params = {
      TableName : "RideToGeofences", 
      KeyConditionExpression: 'rideId = :id',
      ExpressionAttributeValues: {
        ':id': rideId
      }
  };
  try {
    const data = await docClient.query(params).promise()
    return data.Items[0] && data.Items[0].geofenceCodes;
  } catch (e) {
    return []
  }
}

export async function isWithinGeofence(rideId:string, coordinates:string) {
  const validGeofenceCodes = await getValidGeofenceCodes(rideId);
  
  return Boolean(validGeofenceCodes);
};
