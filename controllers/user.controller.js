const db = require("../models");
const user = db.User;
const auth = db.AuthToken;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createToken,
  verifyExpiration,
} = require("../controllers/authToken.controller");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the email exists
    const userExists = await user.findOne({
      where: { email },
    });
    if (userExists) {
      return res
        .status(400)
        .send("Email is already associated with an account");
    }

    await user.create({
      name,
      email,
      password: await bcrypt.hash(password, 15),
    });
    return res.status(200).send("Registration successful");
  } catch (err) {
    return res.status(500).send("Error in registering user");
  }
};

exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const USER = await user.findOne({
      where: { email },
    });
    if (!USER) {
      return res.status(404).json("Email not found");
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, USER.password);
    if (!passwordValid) {
      return res.status(404).json("Incorrect email and password combination");
    }

    // Authenticate user with jwt
    const token = jwt.sign({ id: USER.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
    let refreshToken = await createToken(USER);

    res.status(200).send({
      id: USER.id,
      name: USER.name,
      email: USER.email,
      accessToken: token,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).send("Sign in error: " + err);
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).send("Refresh Token is required!");
  }

  try {
    let refreshToken = await auth.findOne({
      where: { token: requestToken },
    });
    if (!refreshToken) {
      res.status(403).send("Invalid refresh token");
      return;
    }
    if (verifyExpiration(refreshToken)) {
      auth.destroy({ where: { id: refreshToken.id } });
      res
        .status(403)
        .send("Refresh token was expired. Please make a new sign in request");
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
    return res.status(500).send("Internal server error");
  }
};