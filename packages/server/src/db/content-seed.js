const db = require("../models");

async function getSeedContent() {
  const { _id: userId1 } = await db.User.findOne(
    { email: "mathiasfortuna@hotmail.com" },
    { _id: 1 },
  ).lean();
  const { _id: userId2 } = await db.User.findOne(
    { email: "mathifortuna@gmail.com" },
    { _id: 1 },
  ).lean();
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
      title: "American football something",
      type: "gif",
      url: "https://media4.giphy.com/media/wz7DLO0HfUSvG5iZsn/giphy.gif?cid=ecf05e47a9d03c1ed764913ab514fa1318f8caedbc73f2b5&rid=giphy.gif&ct=g",
      userId: userId1,
      categoryId: sportsId,
    },
    {
      title: "Another GIF",
      type: "gif",
      url: "https://media1.giphy.com/media/3o6gbbFBAvwL2oIPeM/giphy.gif?cid=ecf05e47052d1c61bd82132ebf80e9a32654388355378674&rid=giphy.gif&ct=g",
      userId: userId1,
      categoryId: entertainmentId,
    },
    {
      title: "SpongeBob excited!",
      type: "gif",
      url: "https://media3.giphy.com/media/xT1XGR8gPp8ryujhRu/giphy.gif",
      userId: userId1,
      categoryId: reactionsId,
    },
    {
      title: "Patrick eating chicken",
      type: "gif",
      url: "https://media2.giphy.com/media/3o7TKnKFxZKwNJvWyA/giphy.gif?cid=790b7611efbd88fc2cf62589adbfe6242074324d4ffdaa66&rid=giphy.gif&ct=g",
      userId: userId2,
      categoryId: entertainmentId,
    },
    {
      title: "SpongeBob automobile!",
      type: "gif",
      url: "https://media3.giphy.com/media/LG8GAxXth1mJq/giphy.gif?cid=790b7611d1643c2c5cb4abafc66a5dfeab1da7531ad45be0&rid=giphy.gif&ct=g",
      userId: userId2,
      categoryId: entertainmentId,
    },
  ];
}

module.exports = { getSeedContent };
