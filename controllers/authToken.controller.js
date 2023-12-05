"use strict";
const { v4: uuidv4 } = require("uuid");
const db = require("../models");

exports.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

exports.createToken = async function (user) {
  let expiredAt = new Date();
  expiredAt.setSeconds(
    expiredAt.getSeconds() + process.env.JWT_REFRESH_EXPIRATION
  );
  let _token = uuidv4();
  let refreshToken = await db.AuthToken.create({
    token: _token,
    user: user.id,
    expiryDate: expiredAt.getTime(),
  });
  return refreshToken.token;
};
