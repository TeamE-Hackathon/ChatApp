const { PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { ddbDocClient } = require('../initDB');
const { nowTime } = require('../utils/dateTime');

const TABLENAME = "rooms";

module.exports = {
  getAllRooms: async (req, res) => {
    const getAllRoomsParams = {
      TableName: TABLENAME,
    };
    try {
      const data = await ddbDocClient.send(new ScanCommand(getAllRoomsParams));
      res.json(data.Items);
    } catch (err) {
      console.log("Error", err);
    }
  },
  postNewRoom: async (req, res) => {
    console.log("postNewRoom_param.body", req.body);

    const postNewRoomParam = {
      TableName: TABLENAME,
      Item: {
        RoomName: req.body.roomName, // For example, 'Season': 2
        CreatedAt: nowTime(), // For example,  'Episode': 2 (only required if table has sort key)
        Detail: req.body.detail, //For example 'Title': 'The Beginning'
      },
    };
    try {
      const data = await ddbDocClient.send(new PutCommand(postNewRoomParam));
      console.log("Success - item added or updated", data);
      return res.json(data);
    } catch (err) {
      console.log("Error", err);
    }
  }
}