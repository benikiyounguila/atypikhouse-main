const userController = require("../controllers/userController");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const cookieToken = require("../utils/cookieToken");

require("dotenv").config({ path: ".env.test" });

// Configurez Cloudinary avec les variables d'environnement de test
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Mockez Cloudinary
jest.mock("cloudinary", () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload: jest.fn(),
    },
  },
}));

// Mock des dépendances
jest.mock("../models/User");
jest.mock("bcryptjs");
jest.mock("cloudinary");
jest.mock("../utils/cookieToken");

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      file: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
  });

  describe("register", () => {
    it("should register a new user", async () => {
      req.body = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(req.body);
      cookieToken.mockImplementation((user, res) => {
        res.status(200).json({ token: "mocked_token" });
      });

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          token: expect.any(String),
        })
      );
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
      };

      const mockUser = {
        ...req.body,
        isValidatedPassword: jest.fn().mockResolvedValue(true),
      };

      User.findOne.mockResolvedValue(mockUser);
      cookieToken.mockImplementation((user, res) => {
        res.status(200).json({ token: "mocked_token" });
      });

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          token: expect.any(String),
        })
      );
    });
  });

  describe("uploadPicture", () => {
    it("should upload a picture", async () => {
      req.file = { path: "test/path" };
      const mockCloudinaryResponse = {
        secure_url: "https://example.com/image.jpg",
      };

      cloudinary.uploader.upload.mockResolvedValue(mockCloudinaryResponse);

      await userController.uploadPicture(req, res);

      expect(cloudinary.uploader.upload).toHaveBeenCalledWith(req.file.path, {
        folder: "Airbnb/Users",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCloudinaryResponse.secure_url);
    });
  });

  // ... autres tests pour les autres méthodes du contrôleur

  describe("logout", () => {
    it("should logout a user", async () => {
      await userController.logout(req, res);

      expect(res.cookie).toHaveBeenCalledWith(
        "token",
        null,
        expect.any(Object)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Logged out",
      });
    });
  });
});
