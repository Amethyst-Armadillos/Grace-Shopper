"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      email: "",
      securityLevel: "admin",
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "",
      securityLevel: "customer",
    }),
    User.create({
      username: "carl",
      password: "123",
      email: "",
      securityLevel: "customer",
    }),
    User.create({
      username: "bob",
      password: "123",
      email: "",
      securityLevel: "customer",
    }),
    User.create({
      username: "jim",
      password: "123",
      email: "",
      securityLevel: "customer",
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "nine-banded armadillo",
      price: 199.99,
      stock: 50,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Nine-banded_armadillo.jpg/220px-Nine-banded_armadillo.jpg",
    }),
    Product.create({
      name: "tiger",
      price: 800.5,
      stock: 15,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tiger_%28Panthera_tigris%29_%28cropped%29.jpg/220px-Tiger_%28Panthera_tigris%29_%28cropped%29.jpg",
    }),
    Product.create({
      name: "lion",
      price: 1555.68,
      stock: 7,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tiger_%28Panthera_tigris%29_%28cropped%29.jpg/220px-Tiger_%28Panthera_tigris%29_%28cropped%29.jpg",
    }),
    Product.create({
      name: "elephant",
      price: 808.15,
      stock: 5,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/African_elephant_%28Loxodonta_africana%29_%28cropped%29.jpg/220px-African_elephant_%28Loxodonta_africana%29_%28cropped%29.jpg",
    }),
    Product.create({
      name: "giraffe",
      price: 1500,
      stock: 9,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/African_elephant_%28Loxodonta_africana%29_%28cropped%29.jpg/220px-African_elephant_%28Loxodonta_africana%29_%28cropped%29.jpg",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
