const express = require('express');
const adminController = require('../controllers/adminController');
const {
  isAdmin,
  isLoggedIn,
  isAdminOrModerator,
} = require('../middlewares/user');

const router = express.Router();

// Apply middlewares to all routes
router.use(isLoggedIn);

// Routes pour la gestion des utilisateurs (admin uniquement)
router.get('/users', isAdmin, adminController.getAllUsers);
router.put('/update-user/:id', isAdmin, adminController.updateUser);
router.put('/update-user-role/:id', isAdmin, adminController.updateUserRole);
router.delete('/users/:id', isAdmin, adminController.deleteUser);

// Routes pour la gestion des perks (admin uniquement)
router.get('/perks', isAdmin, adminController.getAllPerks);
router.post('/perks', isAdmin, adminController.addPerk);
router.delete('/perks/:name', isAdmin, adminController.deletePerk);

// Routes pour la gestion des propriétés (admin uniquement)
router.get('/places', isAdmin, adminController.getAllPlaces);
router.post('/places', isAdmin, adminController.addPlace);
router.put('/places/:id', isAdmin, adminController.updatePlace);
router.delete('/places/:id', isAdmin, adminController.deletePlace);

// Routes pour la modération (admin et modérateur)
router.get(
  '/places/reviews',
  isAdminOrModerator,
  adminController.getAllReviews
);
router.delete(
  '/reviews/:reviewId',
  isAdminOrModerator,
  adminController.deleteReview
);
router.delete(
  '/reviews/:reviewId/replies/:replyId',
  isAdminOrModerator,
  adminController.deleteReply
);

router.put('/update-profile/:id', isAdmin, adminController.updateUserProfile);

module.exports = router;
