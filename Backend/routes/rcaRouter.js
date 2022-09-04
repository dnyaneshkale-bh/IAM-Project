const express = require("express");

const rcaController = require("../controller/rcaController");
const router = express.Router();
//registration rca
router.post("", rcaController.createRCA);
//update RCA
router.put("/:rca_id", rcaController.updateRCA);
//list of RCA(cards)
router.get("", rcaController.getAllRCA);
//single RCA details(upon clicking on a card)
router.get("/:rca_id", rcaController.getSingleRCA);

router.delete("/:rca_id", rcaController.deleteSingleRCA);

module.exports = router;
