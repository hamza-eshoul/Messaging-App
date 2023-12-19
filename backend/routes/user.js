const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

// sign up
router.post("/signup", userController.sign_up);

// login
router.post("/login", userController.log_in);

// get users
router.get("/", requireAuth, userController.get_users);

// get individual user
router.get("/:id", requireAuth, userController.get_user);

// update user data

router.put("/profile_data", requireAuth, userController.update_profile_data);

router.put("/profile_about", requireAuth, userController.update_profile_about);

// update user image
router.put(
  "/profile_image",
  requireAuth,
  userController.update_user_profile_image
);

router.put(
  "/profile_cover_image",
  requireAuth,
  userController.update_profile_cover_image
);

module.exports = router;
