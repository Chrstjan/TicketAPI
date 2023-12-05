const db = require("../models");
const ticket = db.Ticket;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  /*  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty",
    });
  } */

  if (req.body.token) {
    const Ticket = {
      name: req.body.name,
      date: req.body.type,
      description: req.body.description,
      published: req.body.published,
      user: req.body.token,
    };

    ticket
      .create(Ticket)
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).send({
          message:
            err.message || "An unknown error occured while creating a ticket",
        })
      );
  } else {
    res.status(500).send({
      message: "You need to be signed in first",
    });
  }
};
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  ticket
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tickets.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ticket
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ticket with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ticket with id=" + id,
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;

  ticket
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ticket was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ticket with id=${id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ticket with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ticket
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ticket was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ticket with id=${id}. Maybe ticket was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ticket with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  ticket
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} tickets were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tickets.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  ticket
    .findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tickets.",
      });
    });
};
