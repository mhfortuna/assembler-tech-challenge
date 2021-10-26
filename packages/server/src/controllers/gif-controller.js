const db = require("../models");

async function get(req, res, next) {
  try {
    const { page = 0, limit = 10 } = req.query;
    // This should be used to get most popular gifs
    // const { firebaseId } = req.user;

    const data = await db.Content.find(
      {},
      { type: 1, url: 1, userId: 1, categoryId: 1 },
    )
      .populate({ path: "categoryId", select: "name" })
      .skip(Number(page) * Number(limit))
      .limit(Number(limit));

    res.status(200).send({ message: "Successfully signed in", data: data });
  } catch (error) {
    res.status(401).send({ error: error.message });
    next(error);
  }
}

module.exports = {
  get,
};
