const db = require("../models");
const user = db.User;
const auth = db.AuthToken;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createToken,
  verifyExpiration,
} = require("../controllers/authToken.controller");

// Register user function
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    // Check if user exists by email
    const userExists = await user.findOne({
      where: { email },
    });
    if (userExists) {
      return res
        .status(400)
        .send({ message: "Email is already associated with an account" });
    }

    // Create new user and hash password
    await user.create({
      name,
      email,
      phone,
      password: await bcrypt.hash(password, 15),
    });
    return res.status(200).send({ message: "Registration successful" });
  } catch (err) {
    return res.status(500).send({ message: "Error in registering user" + err });
  }
};

// Sign in function
exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const USER = await user.findOne({
      where: { email },
    });
    if (!USER) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, USER.password);
    if (!passwordValid) {
      return res
        .status(404)
        .json({ message: "Incorrect email and password combination" });
    }

    // Authenticate user with jwt
    const token = jwt.sign({ id: USER.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
    let refreshToken = await createToken(USER);

    // Send user back with name, email and tokens
    res.status(200).send({
      id: USER.id,
      name: USER.name,
      email: USER.email,
      phone: USER.phone,
      accessToken: token,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).send({ message: "Sign in error: " + err });
  }
};

// Refresh Token function
exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).send({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await auth.findOne({
      where: { token: requestToken },
    });
    if (!refreshToken) {
      res.status(403).send({ message: "Invalid refresh token" });
      return;
    }
    if (verifyExpiration(refreshToken)) {
      auth.destroy({ where: { id: refreshToken.id } });
      res
        .status(403)
        .send({
          message:
            "Refresh token was expired. Please make a new sign in request",
        });
      return;
    }

    const user = await db.User.findOne({
      where: { id: refreshToken.user },
      attributes: {
        exclude: ["password"],
      },
    });
    let newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).send({ message: "Internal server error" });
  }
};
