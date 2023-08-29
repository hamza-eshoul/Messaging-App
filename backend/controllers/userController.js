const User = require("../models/userModel");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const cloudinary = require("../cloudinary");
const jwt = require("jsonwebtoken");

// sign up && login helper functions

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const validateSignupForm = (firstName, lastName, email, password) => {
  // Check if form fields exist
  if (!firstName || !lastName || !email || !password) {
    throw Error("All fields must be filled");
  }

  // Check if email is a valid email
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // Check if password is strong enough

  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minNumbers: 0,
      minSymbols: 0,
    })
  ) {
    throw Error(
      "Password must at least contain 6 characters and one uppercase letter"
    );
  }
};

const checkUserExists = async (email) => {
  const exists = await User.findOne({ email });

  if (exists) {
    throw Error("The email is already used by another user.");
  }
};

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

const addUserDB = async (firstName, lastName, email, hashedPassword) => {
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await user.save();

  return user;
};

const signUp = async (firstName, lastName, email, password) => {
  validateSignupForm(firstName, lastName, email, password);

  await checkUserExists(email);

  const hashedPassword = await hashPassword(password);

  const user = await addUserDB(firstName, lastName, email, hashedPassword);

  return user;
};

exports.sign_up = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await signUp(firstName, lastName, email, password);

    const token = createToken(user._id);

    res.status(200).json({ ...user._doc, password: null, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateLoginForm = async (email, password) => {
  // check if email or password are empty
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //   check if user does not exist
  const user = await User.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  return user;
};

const checkPasswordMatch = async (user, password) => {
  const match = await bcryptjs.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
};

const logIn = async (email, password) => {
  const user = await validateLoginForm(email, password);

  await checkPasswordMatch(user, password);

  return user;
};

exports.log_in = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await logIn(email, password);

    const token = createToken(user._id);

    res.status(200).json({ ...user._doc, password: null, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get users
exports.get_users = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    const secureUsers = users.map((user) => {
      return { ...user._doc, password: null };
    });

    res.status(200).json(secureUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get user
exports.get_user = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(200).json({ ...user._doc, password: null });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update user info
exports.update_user_info = async (req, res) => {
  const {
    user_id,
    firstName,
    lastName,
    email,
    profession,
    employer,
    location,
    skills,
  } = req.body;

  try {
    // find user and update his info
    const updateUserInfo = await User.findByIdAndUpdate(
      user_id,
      {
        $set: {
          firstName,
          lastName,
          email,
          profession,
          employer,
          location,
          skills,
        },
      },
      { new: true }
    );

    res.status(200).json(updateUserInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update_user_about = async (req, res) => {
  const { user_id, aboutMe } = req.body;

  try {
    // find user and update his info
    const updateUserInfo = await User.findByIdAndUpdate(
      user_id,
      {
        $set: {
          aboutUser: aboutMe,
        },
      },
      { new: true }
    );

    res.status(200).json(updateUserInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update_user_image = async (req, res) => {
  const { user_id, imageUrl } = req.body;

  try {
    if (!imageUrl) {
      // find user and set his profile image to an empty array
      const emptyUserImage = await User.findByIdAndUpdate(
        user_id,
        {
          $set: {
            profileImg: {
              public_id: "",
              url: "",
            },
          },
        },
        { new: true }
      );

      res.status(200).json(emptyUserImage);
    } else {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: "messenger_app_profile_images",
      });

      // find user and update his profileImage field
      const updateUserImg = await User.findByIdAndUpdate(
        user_id,
        {
          $set: {
            profileImg: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        },
        { new: true }
      );
      res.status(200).json(updateUserImg);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update_user_cover_image = async (req, res) => {
  const { user_id, imageUrl } = req.body;

  try {
    if (!imageUrl) {
      // find user and set his cover image to an empty array
      const emtpyCoverImage = await User.findByIdAndUpdate(
        user_id,
        {
          $set: {
            coverImg: {
              public_id: "",
              url: "",
            },
          },
        },
        { new: true }
      );

      res.status(200).json(emtpyCoverImage);
    } else {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: "messaging_app_profile_cover_images",
      });

      // find user and update his coverImage field
      const updateUserImg = await User.findByIdAndUpdate(
        user_id,
        {
          $set: {
            coverImg: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        },
        { new: true }
      );
      res.status(200).json(updateUserImg);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
