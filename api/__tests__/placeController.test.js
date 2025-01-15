const placeController = require("../controllers/placeController");
const Place = require("../models/Place");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Charger les variables d'environnement pour le test
require("dotenv").config({ path: ".env.test" });

// Mock des modèles et des dépendances
jest.mock("../models/Place");
jest.mock("../models/User");
jest.mock("jsonwebtoken");

describe("Place Controller Tests", () => {
  let testUser, req, res;

  beforeEach(() => {
    testUser = {
      _id: "123456",
      name: "Test User",
      email: "test@example.com",
    };

    jwt.sign.mockReturnValue("mocked_token");

    req = {
      user: { id: testUser._id },
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("addPlace", () => {
    it("should add a new place", async () => {
      const newPlace = {
        title: "New Place",
        address: "New Address",
        addedPhotos: ["newphoto.jpg"],
        description: "New Description",
        perks: ["parking"],
        extraInfo: "Some extra info",
        maxGuests: 2,
        price: 50,
        type: "house",
      };

      req.body = newPlace;
      Place.create.mockResolvedValue(newPlace);

      await placeController.addPlace(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ place: newPlace });
    });
  });

  describe("userPlaces", () => {
    it("should return user specific places", async () => {
      const places = [{ title: "Test Place", owner: testUser._id }];
      Place.find.mockResolvedValue(places);

      await placeController.userPlaces(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(places);
    });
  });

  describe("updatePlace", () => {
    it("should update a place", async () => {
      const updatedPlaceData = {
        id: "12345",
        title: "Updated Place",
        address: "Updated Address",
        addedPhotos: ["updatedphoto.jpg"],
        description: "Updated Description",
        perks: ["wifi"],
        extraInfo: "Some extra info",
        maxGuests: 4,
        price: 75,
        type: "apartment",
      };

      req.body = updatedPlaceData;
      const mockPlace = {
        _id: "12345",
        owner: testUser._id,
        set: jest.fn(),
        save: jest.fn().mockResolvedValue(updatedPlaceData),
      };
      Place.findById.mockResolvedValue(mockPlace);

      await placeController.updatePlace(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "place updated!" });
    });
  });

  describe("getPlaces", () => {
    it("should return all places", async () => {
      const places = [{ _id: "12345", title: "Test Place" }];
      Place.find.mockResolvedValue(places);

      await placeController.getPlaces(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ places });
    });
  });

  describe("singlePlace", () => {
    it("should return a single place", async () => {
      const testPlace = { _id: "12345", title: "Test Place" };
      Place.findById.mockResolvedValue(testPlace);

      req.params.id = "12345";

      await placeController.singlePlace(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ place: testPlace });
    });
  });

  describe("searchPlaces", () => {
    it("should return places matching the search query", async () => {
      const places = [{ _id: "12345", title: "Test Place" }];
      Place.find.mockResolvedValue(places);

      req.params.key = "Test";

      await placeController.searchPlaces(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(places);
    });
  });
});
