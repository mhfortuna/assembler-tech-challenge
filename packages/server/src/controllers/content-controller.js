const db = require("../models");
const { fetchPopularGifs } = require("../services/giphy/giphy-api");

async function get(req, res, next) {
  try {
    const { page = 0, limit = 10 } = req.query;

    let data = await db.Content.find(
      {},
      { type: 1, url: 1, userId: 1, categoryId: 1, title: 1 },
    )
      .populate({ path: "categoryId", select: "name" })
      .skip(Number(page) * Number(limit))
      .limit(Number(limit))
      .lean();
    data = data.map((obj) => ({ ...obj, isGiphy: false }));

    if (data.length < Number(limit)) {
      let {
        data: { data: giphyArray },
      } = await fetchPopularGifs(Number(limit) - data.length);
      giphyArray = giphyArray.map((obj) => ({ ...obj, isGiphy: true }));

      data = [...data, ...giphyArray];
    }

    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: error.message });
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { contentId } = req.params;
    const data = await db.Content.findOne(
      { _id: contentId },
      { type: 1, url: 1, userId: 1, categoryId: 1, title: 1 },
    )
      .populate({ path: "categoryId", select: "name" })
      .lean();

    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: error.message });
    next(error);
  }
}

async function add(req, res, next) {
  try {
    console.log(req.body);
    const { firebaseId } = req.user;
    const { title, type, categoryId, imageUrl } = req.body;
    const { _id: userId } = await db.User.findOne({ firebaseId }, { _id: 1 });
    console.log({ title, type, url: imageUrl, userId, categoryId });
    let data = await db.Content.create({
      title,
      type,
      url: imageUrl,
      userId,
      categoryId,
    });
    console.log(data);

    res.status(200).send({ message: "Content added successfully", data: data });
  } catch (error) {
    res.status(500).send({ error: error.message });
    next(error);
  }
}

module.exports = {
  get,
  add,
  getById,
};
