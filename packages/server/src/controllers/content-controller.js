const db = require("../models");
const { fetchPopularGifs } = require("../services/giphy/giphy-api");

async function get(req, res, next) {
  try {
    const { page = 0, limit = 10 } = req.query;
    // This should be used to get most popular gifs
    // const { firebaseId } = req.user;

    let data = await db.Content.find(
      {},
      { type: 1, url: 1, userId: 1, categoryId: 1, title: 1 },
    )
      .populate({ path: "categoryId", select: "name" })
      .skip(Number(page) * Number(limit))
      .limit(Number(limit))
      .lean();
    data = data.map((obj) => ({ ...obj, isGiphy: false }));
    // console.log(data);

    // console.log("data", data.length);
    if (data.length < Number(limit)) {
      let {
        data: { data: giphyArray },
      } = await fetchPopularGifs(Number(limit) - data.length);
      giphyArray = giphyArray.map((obj) => ({ ...obj, isGiphy: true }));
      // console.log(giphyArray);

      data = [...data, ...giphyArray];
    }

    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: error.message });
    next(error);
  }
}

async function add(req, res, next) {
  try {
    const { firebaseId } = req.user;
    const { _id: userId } = await db.User.findOne({ firebaseId }, { _id: 1 });
    const contentObject = {};
    let picture = req.files["thumbnail"];
    const { page = 0, limit = 10 } = req.query;
    // This should be used to get most popular gifs
    // const { firebaseId } = req.user;

    let data = await db.Content.find(
      {},
      { type: 1, url: 1, userId: 1, categoryId: 1, title: 1 },
    )
      .populate({ path: "categoryId", select: "name" })
      .skip(Number(page) * Number(limit))
      .limit(Number(limit))
      .lean();
    data = data.map((obj) => ({ ...obj, isGiphy: false }));
    // console.log(data);

    // console.log("data", data.length);
    if (data.length < Number(limit)) {
      let {
        data: { data: giphyArray },
      } = await fetchPopularGifs(Number(limit) - data.length);
      giphyArray = giphyArray.map((obj) => ({ ...obj, isGiphy: true }));
      // console.log(giphyArray);

      data = [...data, ...giphyArray];
    }

    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: error.message });
    next(error);
  }
}

module.exports = {
  get,
  add,
};
