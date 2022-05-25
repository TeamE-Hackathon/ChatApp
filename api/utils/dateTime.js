const nowTime = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let time = today.toTimeString();

  dateTime = year + "/" + month + "/" + date + " " + time;
  return dateTime;
};

module.exports = {
  nowTime,
};
