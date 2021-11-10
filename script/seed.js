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
      password: "test123",
      email: "cody@test.com",
      securityLevel: "admin",
    }),
    User.create({
      username: "murphy",
      password: "test123",
      email: "murphy@test.com",
      securityLevel: "customer",
    }),
    User.create({
      username: "carl",
      password: "test123",
      email: "carl@test.com",
      securityLevel: "customer",
    }),
    User.create({
      username: "bob",
      password: "test123",
      email: "bob@test.com",
      securityLevel: "customer",
    }),
    User.create({
      username: "jim",
      password: "test123",
      email: "jim@test.com",
      securityLevel: "customer",
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Rainbow Tulips",
      price: 39.99,
      stock: 50,
      imageUrl:
        "https://fyf.tac-cdn.net/images/products/large/F-395.jpg?auto=webp&quality=80&width=590",
    }),
    Product.create({
      name: "Long Stemmed Roses",
      price: 39.99,
      stock: 50,
      imageUrl:
        "https://fyf.tac-cdn.net/images/products/large/F-208_VR.jpg?auto=webp&quality=80&width=590",
    }),
    Product.create({
      name: "Emo Roses",
      price: 0.99,
      stock: 5307,
      imageUrl:
        "https://media.istockphoto.com/photos/dried-wilted-bouquet-of-red-roses-picture-id922951238?k=20&m=922951238&s=612x612&w=0&h=aTz9cFb9N5rYUTzDQ7Yo-6HGzazAtaM9G602ouVtfLU=",
    }),
    Product.create({
      name: "BumbleBee Lilies, Roses, and Palms",
      price: 29.99,
      stock: 50,
      imageUrl:
        "https://fyf.tac-cdn.net/images/products/large/F-193.jpg?auto=webp&quality=80&width=590",
    }),
    Product.create({
      name: "The Firecracker",
      price: 69.99,
      stock: 50,
      imageUrl: "https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/The%20Firecracker/The%20Firecracker/Firecracker_Carousel.jpg"
    }),
    Product.create({
      name: "Elegant Beauty",
      price: 74.99,
      stock: 50,
      imageUrl: "https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/142185lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}",
    }),
    Product.create({
      name: "The Magician",
      price: 89.99,
      stock: 10,
      imageUrl: "https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/The%20Luna/Luna_Premium_5439.jpg",
    }),
    Product.create({
      name: "Luna",
      price: 99.99,
      stock: 5,
      imageUrl: "https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Morello/New/Morello_Carousel_New.jpg"
    })
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
