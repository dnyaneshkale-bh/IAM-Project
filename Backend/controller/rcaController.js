const db = require("../db/db");
const rcaService = require("../service/rcaService");

class RcaController {
  async getAllRCA(req, res) {
    const allRCA = await rcaService.getAllRCA();
    res.status(allRCA.statusCode).json(allRCA);
  }

  async createRCA(req, res) {
    const created = await rcaService.createRCA(req.body);

    res.status(created.statusCode).json(created);
  }

  async updateRCA(req, res) {
    const updated = await rcaService.updateRCA(req.body, req.params);
    res.json(updated);
  }

  async getSingleRCA(req, res) {
    const singleRCA = await rcaService.getSingleRCA(req.params);
    res.status(singleRCA.statusCode).json(singleRCA);
  }

  async deleteSingleRCA(req, res) {
    const deletedRCA = await rcaService.deleteSingleRCA(req.params);

    res.status(deletedRCA.statusCode).json(deletedRCA);
  }
}

module.exports = new RcaController();
