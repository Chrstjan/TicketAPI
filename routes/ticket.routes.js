const ticket = require("../controllers/ticket.controller.js");
const { verifyToken } = require("../middleware/auth.middleware.js");
let router = require("express").Router();

router.post("/createTicket", verifyToken, ticket.create);
router.get("/getAll", verifyToken, ticket.findAll);
//router.get("/getAllPublished", ticket.findAllPublished);
router.get("/findByID/:id", verifyToken, ticket.findOne);
router.put("/updateByID/:id", verifyToken, ticket.update);
router.delete("/deleteAll", verifyToken, ticket.deleteAll);
router.delete("/deleteByID/:id", verifyToken, ticket.delete);
router.use("/api/tickets", router);

module.exports = router;
