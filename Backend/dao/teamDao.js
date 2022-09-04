const db = require("../db/db");
class TeamDao {
  async createTeamMember(rca_id, memberName, memberEmail, memberRole) {
    try {
      const [member_id] = await db("team")
        .insert({
          rca_id: rca_id,
          member_name: memberName,
          member_email: memberEmail,
          member_role: memberRole,
        })
        .returning("member_id");
      return member_id;
    } catch (err) {
      return "err";
    }
  }

  async getTeamMembers(rcaId) {
    try {
      const allmembers = await db("team")
        .select("*")
        .from("team")
        .where("rca_id", "=", rcaId);
      return allmembers;
    } catch (error) {
      return "error";
    }
  }

  deleteTeamDao = async (rca_id, id) => {
    const [deleted] = await db("team")
      .where("member_id", id)
      .andWhere("rca_id", rca_id)
      .del(["member_id"])
      .returning("member_id");

    if (id == deleted.member_id) {
      return { errorcode: 1, id: deleted };
    } else {
      return { errorcode: 0 };
    }
  };

  //EDIT TEAM MEMBER DAO
  editTeamDao = async (rca_id, id, teamMemberData) => {
    const [updated] = await db("team")
      .where("member_id", id)
      .andWhere("rca_id", rca_id)
      .update({
        member_name: teamMemberData.memberName,
        member_email: teamMemberData.memberEmail,
        member_role: teamMemberData.memberRole,
      })
      .returning("member_id");

    if (updated.member_id == id) {
      return { errorcode: 1, id: updated };
    } else {
      return { errorcode: 0 };
    }
  };
}

module.exports = new TeamDao();
