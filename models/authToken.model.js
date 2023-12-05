module.exports = (sequalize, Sequelize) => {
  const AuthToken = sequalize.define("AuthToken", {
    user: {
      type: Sequelize.INTEGER,
    },
    token: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  });
  return AuthToken;
};
