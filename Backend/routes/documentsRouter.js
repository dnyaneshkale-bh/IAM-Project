const express = require("express");

const documentController = require("../controller/documentController");

const { upload } = require("../helpers/file-uploader");

const router = express.Router({ mergeParams: true });

router
  .post("",upload.array("document", 10),documentController.createDocument)
  .get("", documentController.getDocument)
  .delete("/:document_id",documentController.deleteDocument);

module.exports = router;
