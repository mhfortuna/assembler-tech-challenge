const db = require("../models");
const { searchGifs } = require("../services/giphy/giphy-api");

async function searchContent(req, res, next) {
  try {
    const searchText = req.query?.q;
    const { page = 0, limit = 5 } = req.query;

    let data = await db.Content.find(
      {
        title: { $regex: searchText, $options: "i" },
      },
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
      } = await searchGifs(searchText, Number(limit) - data.length);
      giphyArray = giphyArray.map((obj) => ({ ...obj, isGiphy: true }));

      data = [...data, ...giphyArray];
    }

    return res
      .status(200)
      .send({ message: "Successfully searched", data: data });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

module.exports = {
  searchContent,
};
