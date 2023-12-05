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
