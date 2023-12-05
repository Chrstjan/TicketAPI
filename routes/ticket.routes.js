const ticket = require("../controllers/ticket.controller.js");
const { verifyToken } = require("../middleware/auth.middleware.js");
let router = require("express").Router();

// Ticket Routes for CRUD operations on Tickets
router.post("/create", verifyToken, ticket.create);
router.get("/getAll", verifyToken, ticket.findAll);
router.get("/getOne/:id", verifyToken, ticket.findOne);
router.put("/update/:id", verifyToken, ticket.update);
router.delete("/deleteAll", verifyToken, ticket.deleteAll);
router.delete("/delete/:id", verifyToken, ticket.delete);

module.exports = router;
