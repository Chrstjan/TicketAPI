module.exports = (sequalize, Sequelize) => {
  const Ticket = sequalize.define("Ticket", {
    name: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    user: {
      type: Sequelize.INTEGER,
    },
  });
  return Ticket;
};
