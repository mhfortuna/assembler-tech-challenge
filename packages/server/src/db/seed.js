const db = require("../models");

const { getSeedCategories } = require("./category-seed");
const { getSeedContent } = require("./content-seed");

async function seedCategories() {
  console.log("Started seeding categories 🏃‍♀️");
  const results = getSeedCategories();

  await db.Category.deleteMany({});
  await db.Category.create([...results]);
  console.log("Finished seeding categories 🔚");
}

async function seedContent() {
  console.log("Started seeding content 🏃‍♀️");

  const results = await getSeedContent();

  await db.Content.deleteMany({});
  await db.Content.create([...results]);
  console.log("Finished seeding content 🔚");
}

module.exports = { seedCategories, seedContent };
