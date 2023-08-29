const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// sign up
router.post("/signup", userController.sign_up);

// login
router.post("/login", userController.log_in);

// get users
router.get("/", userController.get_users);

// get individual user
router.get("/:id", userController.get_user);

router.put("/user_info", userController.update_user_info);

router.put("/user_about", userController.update_user_about);

// update user image
router.put("/update_image", userController.update_user_image);

router.put("/update_cover_image", userController.update_user_cover_image);

module.exports = router;
