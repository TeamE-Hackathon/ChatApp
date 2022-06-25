const { PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { ddbDocClient } = require('../initDB');
const { nowTime } = require('../utils/dateTime');

const TABLENAME = 'chats';

module.exports = {
  getChats: async (req, res) => {
    console.log('getChatsが呼ばれた', req.params.roomName);
    const getChatsParams = {
      TableName: TABLENAME,
      IndexName: 'chatsGSI',
      // TODO: CLIと一緒
      KeyConditionExpression: 'RoomName = :name',
      ExpressionAttributeValues: {
        ':name': `${req.params.roomName}`,
      },
      // ProjectionExpression: 'Messeage, CreatedAt, UserName, RoomName',
    };
    try {
      // TODO: ScanCommandではなくクエリーコマンドを調べる
      const data = await ddbDocClient.send(new QueryCommand(getChatsParams));
      console.log('--------------------------------', data);
      res.json(data.Items);
    } catch (err) {
      console.log('Error', err);
    }
  },
  postNewChat: async (req, res) => {
    console.log('postNewChat_param.body', req.body);

    const postNewChatParam = {
      TableName: TABLENAME,
      Item: {
        // UserName: req.body.userName,
        UserName: 'user',
        CreatedAt: nowTime(),
        RoomName: req.roomName,
        Message: req.message,
      },
    };
    try {
      const result = await ddbDocClient.send(new PutCommand(postNewChatParam));
      console.log('Success - item added or updated', result);
      return { result: res.json(result), error: null };
    } catch (error) {
      console.log('Error', error);
      return { result: null, error: error };
    }
  },
};
