const Place = require("../models/Place");

// Adds a place in the DB
exports.addPlace = async (req, res) => {
  try {
    const userData = req.user;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
      type,
    } = req.body;
    const place = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
      type,
    });
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

// Returns user specific places
exports.userPlaces = async (req, res) => {
  try {
    const userData = req.user;
    const id = userData.id;
    res.status(200).json(await Place.find({ owner: id }));
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Updates a place
exports.updatePlace = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
      type,
    } = req.body;

    const place = await Place.findById(id);
    if (userId === place.owner.toString()) {
      place.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        maxGuests,
        price,
        type,
      });
      await place.save();
      res.status(200).json({
        message: "place updated!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

// Returns all the places in DB
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Returns single place, based on passed place id
exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
      return res.status(400).json({
        message: "Place not found",
      });
    }
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Search Places in the DB
exports.searchPlaces = async (req, res) => {
  try {
    const searchword = req.params.key;

    if (searchword === "") return res.status(200).json(await Place.find());

    const searchMatches = await Place.find({
      address: { $regex: searchword, $options: "i" },
    });

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Gestion des commentaires

// Méthode pour récupérer les avis d'un lieu spécifique
exports.getReviewsByPlace = async (req, res) => {
  try {
    const { placeId } = req.params;
    const place = await Place.findById(placeId)
      .populate("reviews.user", "name")
      .populate("reviews.replies.user", "name");
    if (!place || place.reviews.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Aucun avis trouvé pour ce lieu." });
    }
    res.status(200).json({ success: true, data: place.reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Méthode pour répondre à un avis
exports.replyToReview = async (req, res) => {
  try {
    const { placeId, reviewId } = req.params; // IDs du lieu et de l'avis
    const { comment } = req.body;

    const place = await Place.findOneAndUpdate(
      { _id: placeId, "reviews._id": reviewId },
      { $push: { "reviews.$.replies": { user: req.user._id, comment } } },
      { new: true }
    )
      .populate("reviews.user", "name")
      .populate("reviews.replies.user", "name");

    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Lieu ou avis non trouvé." });
    }

    const updatedReview = place.reviews.id(reviewId);
    res.status(201).json({ success: true, data: updatedReview });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la réponse à l'avis",
      error,
    });
  }
};

// Méthode pour ajouter un avis
exports.addReview = async (req, res) => {
  try {
    const { placeId } = req.params;
    const { rating, comment } = req.body;

    const place = await Place.findById(placeId);
    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found." });
    }

    const newReview = {
      user: req.user._id,
      rating,
      comment,
    };

    place.reviews.push(newReview);
    await place.save();

    // Populate user data
    await place.populate("reviews.user", "name");
    await place.populate("reviews.replies.user", "name");

    res.status(201).json({ success: true, data: place.reviews });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding review", error });
  }
};
