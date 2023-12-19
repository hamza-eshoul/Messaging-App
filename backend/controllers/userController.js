const User = require("../models/userModel");
const cloudinary = require("../cloudinary");
// helper functions
const createToken = require("../helpers/createToken");
const signup = require("../helpers/signup");
const login = require("../helpers/login");

exports.sign_up = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await signup(firstName, lastName, email, password);

    const token = createToken(user._id);

    res.status(200).json({ ...user._doc, password: null, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.log_in = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ ...user._doc, password: null, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

exports.get_user = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(200).json({ ...user._doc, password: null });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update_profile_data = async (req, res) => {
  const { firstName, lastName, email, profession, employer, location, skills } =
    req.body;

  try {
    const updatedUserData = await User.findByIdAndUpdate(
      req.user._id,
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

    res.status(200).json(updatedUserData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update_profile_about = async (req, res) => {
  const { aboutText } = req.body;

  try {
    const updateUserInfo = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          aboutUser: aboutText,
        },
      },
      { new: true }
    );

    res.status(200).json(updateUserInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update_user_profile_image = async (req, res) => {
  const { imageUrl } = req.body;

  try {
    if (!imageUrl) {
      const updatedUserEmptyProfileImage = await User.findByIdAndUpdate(
        req.user._id,
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

      res.status(200).json(updatedUserEmptyProfileImage);
    }

    if (imageUrl) {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: "messenger_app_profile_images",
      });

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
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
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update_profile_cover_image = async (req, res) => {
  const { imageUrl } = req.body;

  try {
    if (!imageUrl) {
      const updatedUserEmptyCoverImage = await User.findByIdAndUpdate(
        req.user._id,
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

      res.status(200).json(updatedUserEmptyCoverImage);
    }
    if (imageUrl) {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: "messaging_app_profile_cover_images",
      });

      // find user and update his coverImage field
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
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
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
