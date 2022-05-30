const { PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { ddbDocClient } = require('../initDB');
const { nowTime } = require('../utils/dateTime');

const params = {
  TableName: "chat",
};

module.exports = {
  getAllRooms: async () => {
    try {
      const data = await ddbDocClient.send(new ScanCommand(params));
      console.log(data.Items);
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  },
  postNewRoom: async (req, res) => {
    console.log("postNewRoom_param", req);

    const postNewRoomParam = {
      TableName: "rooms",
      Item: {
        room_name: req.body.detail, // For example, 'Season': 2
        created_at: nowTime(), // For example,  'Episode': 2 (only required if table has sort key)
        detail: req.body.detail, //For example 'Title': 'The Beginning'
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