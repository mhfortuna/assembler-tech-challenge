const db = require("../models");

async function getSeedContent() {
  const { _id: userId } = await db.User.findOne({}, { _id: 1 }).lean();
  const { _id: sportsId } = await db.Category.findOne(
    { name: "sports" },
    { _id: 1 },
  ).lean();
  const { _id: reactionsId } = await db.Category.findOne(
    { name: "reactions" },
    { _id: 1 },
  ).lean();
  const { _id: entertainmentId } = await db.Category.findOne(
    { name: "entertainment" },
    { _id: 1 },
  ).lean();
  return [
    {
      type: "gif",
      url: "https://media4.giphy.com/media/wz7DLO0HfUSvG5iZsn/giphy.gif?cid=ecf05e47a9d03c1ed764913ab514fa1318f8caedbc73f2b5&rid=giphy.gif&ct=g",
      userId: userId,
      categoryId: sportsId,
    },
    {
      type: "gif",
      url: "https://media1.giphy.com/media/3o6gbbFBAvwL2oIPeM/giphy.gif?cid=ecf05e47052d1c61bd82132ebf80e9a32654388355378674&rid=giphy.gif&ct=g",
      userId: userId,
      categoryId: entertainmentId,
    },
    {
      type: "gif",
      url: "https://media3.giphy.com/media/xT1XGR8gPp8ryujhRu/giphy.gif",
      userId: userId,
      categoryId: reactionsId,
    },
  ];
}

module.exports = { getSeedContent };
