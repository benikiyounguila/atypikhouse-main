const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isLoggedIn, isAdminOrModerator } = require("../middlewares/user"); // Importer isAdminOrModerator ici

const upload = multer({ dest: "/tmp" });

const {
  register,
  login,
  logout,
  googleLogin,
  uploadPicture,
  updateUserDetails,
  getAllUsers,
} = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/google/login").post(googleLogin);
router
  .route("/upload-picture")
  .post(upload.single("picture", 1), uploadPicture);
router.route("/update-user").put(updateUserDetails);
router.route("/logout").get(logout);

// Ajout de la route pour récupérer tous les utilisateurs, accessible à l'admin et au modérateur
router.route("/").get(isLoggedIn, isAdminOrModerator, getAllUsers); // Utilisation de isAdminOrModerator

module.exports = router;
