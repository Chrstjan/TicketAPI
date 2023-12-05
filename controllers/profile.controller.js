const db = require("../models/index");
const User = db.User;
const Ticket = db.Ticket;

exports.fetchUserData = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: {
      exclude: ["password"],
    },
  });
  return res.send(user);
};

exports.fetchUserTickets = async (req, res) => {
  const tickets = await Ticket.findAll({
    where: {
      user: req.user.token,
    },
  });
  return res.send(tickets);
};
