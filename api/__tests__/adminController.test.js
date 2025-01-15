const adminController = require("../controllers/adminController");
const User = require("../models/User");
const Place = require("../models/Place");

// Mock des modèles
jest.mock("../models/User");
jest.mock("../models/Place");

describe("Admin Controller Tests", () => {
  // Test pour createManager
  test("createManager devrait créer un nouvel administratteur", async () => {
    const req = {
      body: {
        name: "Test Admin",
        email: "admin@test1.com",
        password: "password1234",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.prototype.save.mockResolvedValue(req.body);

    await adminController.createManager(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.any(Object),
      })
    );
  });

  // Test pour updateUser
  test("updateUser devrait mettre à jour un utilisateur existant", async () => {
    const req = {
      params: { id: "1234" },
      body: { name: "Updated Name", email: "updated@test1.com" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findByIdAndUpdate.mockResolvedValue(req.body);

    await adminController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "User updated successfully",
        data: expect.any(Object),
      })
    );
  });

  // Test pour deleteUser
  test("deleteUser devrait supprimer un utilisateur", async () => {
    const req = {
      params: { id: "1234" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findByIdAndDelete.mockResolvedValue({});

    await adminController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Utilisateur supprimé",
      })
    );
  });

  // Test pour getAllPerks
  test("getAllPerks devrait retourner tous les avantages", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Place.find.mockResolvedValue([{ perks: ["wifi", "parking"] }]);

    await adminController.getAllPerks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.any(Array),
      })
    );
  });

  // Ajoutez d'autres tests pour les fonctions restantes...
});
