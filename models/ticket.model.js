module.exports = (sequalize, Sequelize) => {
  const Ticket = sequalize.define("Ticket", {
    title: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    published: {
      type: Sequelize.STRING,
    },
    user: {
      type: Sequelize.INTEGER,
    },
  });
  return Ticket;
};
