const rcaDao = require("../dao/rcaDao");
const { v4: uuid4 } = require("uuid");
class rcaService {
  async getAllRCA() {
    return rcaDao.getAllRCA();
  }

  async createRCA(rcaDto) {
    // console.log("inside createRCA service");
    const {
      rcaName,
      facilityName,
      severity,
      creationDate,
      targetDate,
      problemDescription,
      safetyImpact,
      enviornmentImpact,
      revenueImpact,
      reputationImpact,
      assetImpact,

      caseId,
      source,
      owner,
      status,
    } = rcaDto;
    return rcaDao.createRCA(
      uuid4(),
      rcaName,
      facilityName,
      severity,
      creationDate,
      targetDate,
      problemDescription,
      safetyImpact,
      enviornmentImpact,
      revenueImpact,
      reputationImpact,
      assetImpact,

      caseId,
      source,
      owner,
      status
    );
  }

  async updateRCA(rcaDto, rcaParam) {
    const { rca_id } = rcaParam;

    const {
      rcaName,
      facilityName,
      severity,
      creationDate,
      targetDate,
      problemDescription,
      safetyImpact,
      enviornmentImpact,
      revenueImpact,
      reputationImpact,
      assetImpact,
      caseId,
      source,
      owner,
      status,
    } = rcaDto;

    let checkRCA;
    await rcaDao.isRcaIdExists(rca_id).then((value) => {
      checkRCA = value.valuecode;
    });
    if (checkRCA == 1) {
      return rcaDao.updateRCA(
        rca_id,
        rcaName,
        facilityName,
        severity,
        creationDate,
        targetDate,
        problemDescription,
        safetyImpact,
        enviornmentImpact,
        revenueImpact,
        reputationImpact,
        assetImpact,
        caseId,
        source,
        owner,
        status
      );
    } else {
      return { statusCode: 400, message: "no record for given rca_id" };
    }
  }

  async getSingleRCA(params) {
    const { rca_id } = params;
    let checkRCA;
    await rcaDao.isRcaIdExists(rca_id).then((value) => {
      checkRCA = value.valuecode;
    });
    if (checkRCA == 1) {
      return rcaDao.getSingleRCA(rca_id);
    } else {
      return { statusCode: 400, message: "no record for given rca_id" };
    }
  }

  async deleteSingleRCA(params) {
    const { rca_id } = params;

    let checkRCA;

    await rcaDao.isRcaIdExists(rca_id).then((value) => {
      checkRCA = value.valuecode;
    });

    if (checkRCA == 1) {
      return rcaDao.deleteSingleRCA(rca_id);
    } else {
      return { statusCode: 400, message: "no record for given rca_id" };
    }
  }
}

module.exports = new rcaService();
