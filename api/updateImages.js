const mongoose = require("mongoose");
const axios = require("axios");
const Place = require("./models/Place");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/atypikhousebd", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("DB connected successfully");

    const unsplashAccessKey = "NyrMPxJAgXT6rUXxvfH2Ly7GAXGLUKEm9ShvKC3Gr2k";

    const placeTypes = {
      Treehouse: "treehouse",
      Yurt: "yurt",
      Boat: "boat",
      Cave: "cave",
      Igloo: "igloo",
      Other: "house",
    };

    async function getUnsplashImages(query) {
      try {
        const imageCount = Math.floor(Math.random() * 3) + 6; // Random number between 6 and 8
        const response = await axios.get(
          `https://api.unsplash.com/photos/random`,
          {
            params: {
              query,
              count: imageCount,
              client_id: unsplashAccessKey,
            },
          }
        );
        return response.data.map((photo) => photo.urls.regular);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.log("Unsplash rate limit exceeded. Using fallback images.");
          return Array.from(
            { length: Math.floor(Math.random() * 3) + 6 },
            (_, i) => `https://picsum.photos/500/300?random=${i}`
          );
        } else {
          throw error;
        }
      }
    }

    // Update each place with new random images
    const places = await Place.find();

    for (const place of places) {
      const query = placeTypes[place.type] || "house";
      const images = await getUnsplashImages(query);
      place.photos = images;
      await place.save();
    }

    console.log("Images updated successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
