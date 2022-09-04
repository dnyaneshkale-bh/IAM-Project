const TeamDao = require('../dao/teamDao')

class TeamService {
   async createTeamMember(teamDto,rca_id) {
      console.log(teamDto,rca_id);
      const { memberName, memberEmail, memberRole } = teamDto;
      return TeamDao.createTeamMember(rca_id, memberName, memberEmail, memberRole);
   }

   async getTeamMembers(rcaId) {
      return TeamDao.getTeamMembers(rcaId);
   }

    deleteTeamService = async (rca_id,id) => {
      let errcode;
      let memberid;
      await TeamDao.deleteTeamDao(rca_id,id)
                .then((data) => {
                  errcode = data.errorcode;
                  memberid = data.id.member_id;
               });
      if (errcode == 1) {
         return { errorcode: errcode, member__id: memberid }
      }
      else {
         return { message: "Error......" }
      }
   }


   //EDIT TEAM MEMBER SERVICE
   editTeamService = async (rca_id,id, teamMemberData) => {
      let errcode;
      let memberid;
      await TeamDao.editTeamDao(rca_id,id, teamMemberData)
               .then((data) => {
                  errcode = data.errorcode;
                  memberid = data.id.member_id;
               });
      if (errcode == 1) {
         return { errorcode: errcode, member__id: memberid }
      }
      else {
         return { message: "Error......" }
      };
   }
  
}

module.exports = new TeamService();