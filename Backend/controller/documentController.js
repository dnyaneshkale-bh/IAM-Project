const documentService = require("../service/documentService");

class DocumentController {
  async createDocument(req, res) {
    try {
      const data = await documentService.createDocument(req);

      res.status(data.statuscode).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  async getDocument(req, res) {
    try {
      const data = await documentService.getDocument(req.params);
      res.status(data.statusCode).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteDocument(req, res) {
    try {
      const data = await documentService.deleteDocument(req.params);
      res.status(204).json(data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new DocumentController();
