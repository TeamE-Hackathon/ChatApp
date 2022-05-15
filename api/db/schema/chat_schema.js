const AWS = require('aws-sdk');
// Set the region
AWS.config.update({
  region: "REGION",
  endpoint: "http://localhost:8000"
});

// TODO: なぜか読み込めない
// AWS.config.loadFromPath('./../config.json');

// Create the DynamoDB service object
const dynamoDB = new AWS.DynamoDB({apiVersion: '2022-05-15'});

// 書き込みスループットを最大化させつつ、必要な探索を最小限で実現するためGSIを定義
const params = {
  TableName: 'chat',
  AttributeDefinitions: [
    { AttributeName: 'name', AttributeType: 'S' },
    { AttributeName: 'time', AttributeType: 'S' },
    { AttributeName: 'chat_room', AttributeType: 'S' },
  ],
  KeySchema: [
    { AttributeName: 'name', KeyType: 'HASH' },
    { AttributeName: 'time', KeyType: 'RANGE' }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'chat_global_index',
      Projection: {
        ProjectionType: 'KEYS_ONLY'
      },
      KeySchema: [
        { AttributeName: 'chat_room', KeyType: 'HASH' },
        { AttributeName: 'time', KeyType: 'RANGE' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

dynamoDB.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
  }
})