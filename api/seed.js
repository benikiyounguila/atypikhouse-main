// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const { faker } = require("@faker-js/faker");
// const User = require("./models/User");
// const Place = require("./models/Place");

// mongoose
//   .connect(
//     "mongodb+srv://benou:ZzxGUIWihv3RaUHB@cluster0.89v0h.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(async () => {
//     console.log("DB connected successfully");

//     // Création d'un utilisateur admin
//     const adminUser = {
//       name: "Admin AtypikHouse",
//       email: "admin@atypikhouse.com",
//       password: "AdminAtypik*",
//       isAdmin: true,
//     };

//     // const adminUser = [
//     //   {
//     //     name: "Admin AtypikHouse 1",
//     //     email: "admin1@atypikhouse.com",
//     //     password: "AdminAtypik*1",
//     //     role: "admin",
//     //     isAdmin: true, // Définir le rôle comme "admin"
//     //   },
//     //   {
//     //     name: "Admin AtypikHouse 2",
//     //     email: "admin2@atypikhouse.com",
//     //     password: "AdminAtypik*2",
//     //     role: "admin",
//     //     isAdmin: true, // Définir le rôle comme "admin"
//     //   },
//     // ];

//     let existingAdmin = await User.findOne({ email: adminUser.email });
//     console.log("Existing Admin:", existingAdmin);
//     if (!existingAdmin) {
//       existingAdmin = await User.create(adminUser);
//       console.log("Admin user created successfully");
//     } else {
//       console.log("Admin user already exists");
//     }

//     // // for (const adminUser of adminUsers) {
//     // let existingAdmin = await User.findOne({ email: adminUser.email });
//     // console.log(`Existing Admin (${adminUser.email}):`, existingAdmin);
//     // if (!existingAdmin) {
//     //   adminUser.password = await bcrypt.hash(adminUser.password, 10); // Hashing du mot de passe
//     //   existingAdmin = await User.create(adminUser);
//     //   console.log(`${adminUser.name} created successfully`);
//     // } else {
//     //   console.log(`${adminUser.name} already exists`);
//     // }
//     // // }

//     // Vérification et création d'utilisateurs si n'existent pas
//     const users = [
//       {
//         name: "John Doe",
//         email: "john@example.com",
//         password: await bcrypt.hash("password1234", 10),
//       },
//       {
//         name: "Jane Smith",
//         email: "jane@example.com",
//         password: await bcrypt.hash("password123", 10),
//       },
//     ];

//     const createdUsers = [];
//     for (const user of users) {
//       let existingUser = await User.findOne({ email: user.email });
//       if (!existingUser) {
//         existingUser = await User.create(user);
//       }
//       createdUsers.push(existingUser);
//     }

//     // Tableau d'URLs d'images spécifiques aux maisons atypiques
//     const atypicalHouseImages = [
//       "https://i.pinimg.com/564x/2f/9d/29/2f9d290798bd716b136058ef8d369a75.jpg",
//       "https://i.pinimg.com/564x/1d/1d/2d/1d1d2d8394cb58645713df2472e8af3f.jpg",
//       "https://i.pinimg.com/564x/d2/e1/c4/d2e1c4a636c8b186b0712a7c5df961bf.jpg",
//       // Ajoutez d'autres URLs d'images ici
//     ];

//     const placeTypes = ["Treehouse", "Yurt", "Boat", "Cave", "Igloo", "Other"];

//     // Génération de logements atypiques
//     const places = [];
//     for (let i = 0; i < 50; i++) {
//       const owner =
//         createdUsers[Math.floor(Math.random() * createdUsers.length)]._id;
//       const title = faker.company.name();
//       const address = faker.location.streetAddress();
//       const photos = [
//         atypicalHouseImages[
//           Math.floor(Math.random() * atypicalHouseImages.length)
//         ],
//         atypicalHouseImages[
//           Math.floor(Math.random() * atypicalHouseImages.length)
//         ],
//         atypicalHouseImages[
//           Math.floor(Math.random() * atypicalHouseImages.length)
//         ],
//       ];
//       const description = faker.lorem.paragraph();
//       const perks = ["WiFi", "Heating", "Kitchen"];
//       const extraInfo = faker.lorem.sentence();
//       const maxGuests = faker.number.int({ min: 1, max: 10 });
//       const price = faker.number.int({ min: 50, max: 500 });
//       const type = placeTypes[Math.floor(Math.random() * placeTypes.length)];
//       const amenities = ["WiFi", "Heating", "Kitchen"];

//       places.push({
//         owner,
//         title,
//         address,
//         photos,
//         description,
//         perks,
//         extraInfo,
//         maxGuests,
//         price,
//         type,
//         amenities,
//       });
//     }

//     await Place.insertMany(places);

//     console.log("Data seeded successfully");
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error("DB connection failed:", err);
//   });



// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const { faker } = require("@faker-js/faker");
// const User = require("./models/User");
// const Place = require("./models/Place");

// async function seedDatabase() {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://benou:ZzxGUIWihv3RaUHB@cluster0.89v0h.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log("DB connected successfully");

//     // Création d'un utilisateur admin avec hash du mot de passe
//     const adminUser = {
//       name: "AdminAtypikHouse",
//       email: "adm@atypikhouse.com",
//       password: await bcrypt.hash("123456", 10),
//       isAdmin: true,
//     };

//     let existingAdmin = await User.findOne({ email: adminUser.email });
//     if (!existingAdmin) {
//       existingAdmin = await User.create(adminUser);
//       console.log("Admin user created successfully");
//     } else {
//       console.log("Admin user already exists");
//     }

//     // Vérification et création d'utilisateurs si n'existent pas
//     const usersData = [
//       { name: "John Doe", email: "john@example.com", password: "password1234" },
//       { name: "Jane Smith", email: "jane@example.com", password: "password123" },
//     ];

//     const createdUsers = [];
//     for (const user of usersData) {
//       let existingUser = await User.findOne({ email: user.email });
//       if (!existingUser) {
//         user.password = await bcrypt.hash(user.password, 10);
//         existingUser = await User.create(user);
//       }
//       createdUsers.push(existingUser);
//     }

//     if (createdUsers.length === 0) {
//       console.error("Aucun utilisateur créé, impossible de générer des logements.");
//       return;
//     }

//     // Tableau d'URLs d'images spécifiques aux maisons atypiques
//     const atypicalHouseImages = [
//       "https://i.pinimg.com/564x/2f/9d/29/2f9d290798bd716b136058ef8d369a75.jpg",
//       "https://i.pinimg.com/564x/1d/1d/2d/1d1d2d8394cb58645713df2472e8af3f.jpg",
//       "https://i.pinimg.com/564x/d2/e1/c4/d2e1c4a636c8b186b0712a7c5df961bf.jpg",
//     ];

//     function getRandomImages(imageArray, count) {
//       return [...new Set(Array.from({ length: count }, () => imageArray[Math.floor(Math.random() * imageArray.length)]))];
//     }

//     const placeTypes = ["Treehouse", "Yurt", "Boat", "Cave", "Igloo", "Other"];

//     // Génération de logements atypiques
//     const places = [];
//     for (let i = 0; i < 50; i++) {
//       const owner = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id;
//       places.push({
//         owner,
//         title: faker.company.name(),
//         address: faker.location.streetAddress(),
//         photos: getRandomImages(atypicalHouseImages, 3),
//         description: faker.lorem.paragraph(),
//         perks: ["WiFi", "Heating", "Kitchen"],
//         extraInfo: faker.lorem.sentence(),
//         maxGuests: faker.number.int({ min: 1, max: 10 }),
//         price: faker.number.int({ min: 50, max: 500 }),
//         type: placeTypes[Math.floor(Math.random() * placeTypes.length)],
//         amenities: ["WiFi", "Heating", "Kitchen"],
//       });
//     }

//     await Place.insertMany(places);
//     console.log("Data seeded successfully");
//   } catch (err) {
//     console.error("DB connection failed:", err);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// seedDatabase();


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const User = require("./models/User");
const Place = require("./models/Place");

async function seedDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://benou:ZzxGUIWihv3RaUHB@cluster0.89v0h.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0",
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // }
    );
    console.log("DB connected successfully");

    // Création d'un utilisateur admin avec hash du mot de passe
    const adminUser = {
      name: "AdminAtypikHouse",
      email: "adm@atypikhouse.com",
      password: await bcrypt.hash("123456", 10),
      isAdmin: true,
    };

    let existingAdmin = await User.findOne({ email: adminUser.email });
    if (!existingAdmin) {
      existingAdmin = await User.create(adminUser);
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }

    // Création d'un nouvel admin (ajouté après la création d'admins existants)
    const newAdmin = {
      name: "SuperAdmin",
      email: "superadmin@atypikhouse.com",
      password: await bcrypt.hash("admin1234", 10),
      isAdmin: true,
    };

    let existingNewAdmin = await User.findOne({ email: newAdmin.email });
    if (!existingNewAdmin) {
      existingNewAdmin = await User.create(newAdmin);
      console.log("New admin user created successfully");
    } else {
      console.log("New admin user already exists");
    }

    // Vérification et création d'utilisateurs si n'existent pas
    const usersData = [
      { name: "John Doe", email: "john@example.com", password: "password1234" },
      { name: "Jane Smith", email: "jane@example.com", password: "password123" },
    ];

    const createdUsers = [];
    for (const user of usersData) {
      let existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        user.password = await bcrypt.hash(user.password, 10);
        existingUser = await User.create(user);
      }
      createdUsers.push(existingUser);
    }

    if (createdUsers.length === 0) {
      console.error("Aucun utilisateur créé, impossible de générer des logements.");
      return;
    }

    // Tableau d'URLs d'images spécifiques aux maisons atypiques
    const atypicalHouseImages = [
      "https://i.pinimg.com/564x/2f/9d/29/2f9d290798bd716b136058ef8d369a75.jpg",
      "https://i.pinimg.com/564x/1d/1d/2d/1d1d2d8394cb58645713df2472e8af3f.jpg",
      "https://i.pinimg.com/564x/d2/e1/c4/d2e1c4a636c8b186b0712a7c5df961bf.jpg",
    ];

    function getRandomImages(imageArray, count) {
      return [...new Set(Array.from({ length: count }, () => imageArray[Math.floor(Math.random() * imageArray.length)]))];
    }

    const placeTypes = ["Treehouse", "Yurt", "Boat", "Cave", "Igloo", "Other"];

    // Génération de logements atypiques
    const places = [];
    for (let i = 0; i < 50; i++) {
      const owner = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id;
      places.push({
        owner,
        title: faker.company.name(),
        address: faker.location.streetAddress(),
        photos: getRandomImages(atypicalHouseImages, 3),
        description: faker.lorem.paragraph(),
        perks: ["WiFi", "Heating", "Kitchen"],
        extraInfo: faker.lorem.sentence(),
        maxGuests: faker.number.int({ min: 1, max: 10 }),
        price: faker.number.int({ min: 50, max: 500 }),
        type: placeTypes[Math.floor(Math.random() * placeTypes.length)],
        amenities: ["WiFi", "Heating", "Kitchen"],
      });
    }

    await Place.insertMany(places);
    console.log("Data seeded successfully");
  } catch (err) {
    console.error("DB connection failed:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
