const db = require("../db/db");
class rcaDao {
  async getAllRCA() {
    const allRCA = await db("rca_table").select(
      // "rca_id",
      // "rca_name",
      // "facility_name",
      // "severity",
      // "status"
      "*"
    );

    if (allRCA.length > 0) {
      return { statusCode: 200, message: allRCA };
    } else {
      return { statusCode: 400, message: "Error getting RCA's" };
    }
  }

  async createRCA(
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
  ) {
    const created = await db("rca_table")
      .insert({
        rca_id: rca_id,
        rca_name: rcaName,
        facility_name: facilityName,
        severity: severity,
        creation_date: creationDate,
        target_date: targetDate,
        problem_description: problemDescription,
        safety_impact: safetyImpact,
        enviornment_impact: enviornmentImpact,
        revenue_impact: revenueImpact,
        reputation_impact: reputationImpact,
        asset_impact: assetImpact,

        case_id: caseId,
        source: source,
        owner: owner,
        status: status,
      })
      .returning([
        "rca_id",
        "case_id",
        "source",
        "creation_date",
        "owner",
        "status",
      ]);

    if (created.length > 0) {
      return { statusCode: 201, message: created };
    } else {
      return { statusCode: 400, message: "Error creating RCA" };
    }
  }

  async updateRCA(
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
  ) {
    const updated = await db("rca_table")
      .update({
        rca_name: rcaName,
        facility_name: facilityName,
        severity: severity,
        creation_date: creationDate,
        target_date: targetDate,
        problem_description: problemDescription,
        safety_impact: safetyImpact,
        enviornment_impact: enviornmentImpact,
        revenue_impact: revenueImpact,
        reputation_impact: reputationImpact,
        asset_impact: assetImpact,

        case_id: caseId,
        source: source,
        owner: owner,
        status: status,
      })
      .where("rca_id", rca_id)
      .returning([
        "rca_id",
        "case_id",
        "source",
        "creation_date",
        "owner",
        "status",
      ]);
    if (updated.length > 0) {
      return { statusCode: 200, message: updated };
    } else {
      return { statusCode: 400, message: "error updating RCA" };
    }
  }

  async getSingleRCA(rca_id) {
    const singleRCA = await db("rca_table").select().where("rca_id", rca_id);
    return { statusCode: 200, message: singleRCA };
  }

  async isRcaIdExists(id) {
    let n = await db("rca_table").where("rca_id", id).count();

    if (n[0].count == 1) {
      return { Message: "Rcaid is already exists", valuecode: 1 };
    } else {
      return { valuecode: 0 };
    }
  }

  async deleteSingleRCA(rca_id) {
    const deletedRCA = await db("rca_table")
      .delete()
      .where("rca_id", rca_id)
      .returning("*");

    return { statusCode: 202, message: deletedRCA };
  }
}

module.exports = new rcaDao();
