const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromEnv } = require('@aws-sdk/credential-providers'); // CommonJS import

require('dotenv').config();
const REGION = process.env.AWS_DEFAULT_REGION;
const ENDPOINT = process.env.LOCAL_DYNAMO_DB_URL + ':' + process.env.DB_PORT;

// Bare-bones DynamoDB Client
const ddbClient = new DynamoDBClient({
  region: REGION,
  endpoint: ENDPOINT,
  credentials: fromEnv(),
});

// Purpose: ddbDocClient.js is a helper function that creates an Amazon DynamoDB service document client.
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the Bare-bones DynamoDB Document client.
exports.ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);
