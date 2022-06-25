const AWS = require('aws-sdk');
// Set the region
AWS.config.update({
  region: 'REGION',
  endpoint: 'http://localhost:8000',
});

// TODO: なぜか読み込めない
// AWS.config.loadFromPath('./../config.json');

// Create the DynamoDB service object
const dynamoDB = new AWS.DynamoDB({ apiVersion: '2022-05-15' });

const params = {
  TableName: 'users',
  AttributeDefinitions: [
    { AttributeName: 'Id', AttributeType: 'S' },
    { AttributeName: 'CreatedAt', AttributeType: 'S' },
  ],
  KeySchema: [
    { AttributeName: 'Id', KeyType: 'HASH' },
    { AttributeName: 'CreatedAt', KeyType: 'RANGE' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamoDB.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
