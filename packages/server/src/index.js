const app = require("./server");
const { config } = require("./config/config");
const connect = require("./db/connect");
// const {
// seedCategories,
// seedContent,
// } = require("./db/seed");

connect()
  .then(async () => {
    app.listen(config.app.port, () => {
      console.log(`Server running at port ${config.app.port}`);
    });
    // await seedCategories();
    // await seedContent();
  })
  .catch((err) => {
    console.log(err);
  });
