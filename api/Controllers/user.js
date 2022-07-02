const { PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { ddbDocClient } = require('../initDB');
const { nowTime } = require('../utils/dateTime');

const TABLENAME = 'users';

module.exports = {
  getAllUsers: async (req, res) => {
    const getAllUsersParams = {
      TableName: TABLENAME,
    };
    try {
      const data = await ddbDocClient.send(new ScanCommand(getAllUsersParams));
      res.json(data.Items);
    } catch (err) {
      console.log('Error', err);
    }
  },

  createNewUser: async (req, res) => {
    const createNewUserParam = {
      TableName: TABLENAME,
      Item: {
        Uid: req.body.uid,
        CreatedAt: nowTime(),
        Name: req.body.name,
        SignInType: req.body.signInType,
      },
    };
    try {
      const data = await ddbDocClient.send(new PutCommand(createNewUserParam));
      console.log('Success - item added or updated', data);
      return res.json(data);
    } catch (error) {
      console.log('Error', error);
    }
  },

  findUserById: async (req, res) => {},

  updateAUser: async (req, res) => {},

  deleteAUser: async (req, res) => {},
};
