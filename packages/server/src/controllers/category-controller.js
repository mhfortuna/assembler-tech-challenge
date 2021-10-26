const db = require("../models");

async function get(req, res, next) {
  try {
    // This should be used to get most popular gifs
    // const { firebaseId } = req.user;

    const data = await db.Category.find({}, { name: 1 }).lean();

    res.status(200).send({ data: data });
  } catch (error) {
    res.status(401).send({ error: error.message });
    next(error);
  }
}

module.exports = {
  get,
};
