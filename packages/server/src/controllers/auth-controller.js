const db = require("../models");

async function signUp(req, res, next) {
  const { firebaseId, email } = req.user;
  const { firstName, lastName } = req.body;

  try {
    const data = await db.User.findOne({ firebaseId }, { _id: 1 });

    if (!data) {
      const newUser = await db.User.create({
        firebaseId,
        firstName,
        lastName,
        email,
      });

      return res
        .status(200)
        .send({ message: "Successfully signed up", data: newUser });
    }

    res
      .status(200)
      .send({ message: "User already exists found", userId: data._id });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function signIn(req, res, next) {
  try {
    const { firebaseId } = req.user;

    const data = await db.User.findOne(
      { firebaseId },
      { firstName: 1, lastName: 1, _id: 1, email: 1 },
    );

    res.status(200).send({ message: "Successfully signed in", data: data });
  } catch (error) {
    res.status(401).send({ error: error.message });
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
};
