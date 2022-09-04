const { json } = require('express');
const TeamService = require('../service/teamService')

class TeamController {

    async createTeamMember(req, res) {
        try {
            const id = await TeamService.createTeamMember(req.body, req.params.rca_id);
            res.status(201).json(id);
        }
        catch (err) {
            console.error(err);
        }
    }

    async getTeamMembers(req, res) {
        try {
            const rcaId = req.params.rca_id;
            const allMembers = await TeamService.getTeamMembers(rcaId);
            res.status(200).json(allMembers);
        } catch (error) {
            console.log(error);
        }
    }

    deleteTeam = async (req, res) => {
        try {
            const id = req.params.id;
            const rca_id = req.params.rca_id;
            await TeamService.deleteTeamService(rca_id,id).then((data) => {
                if (data) {
                    res.status(204).json();
                }
                else {
                    res.status(400).json();
                }
            });
        }
        catch
        {
            res.status(400).json();
        }
    }

    //EDIT TEAM MEMBER CONTROLLER
    editTeam = async (req, res) => {
        try {
            const id = req.params.id;
            const rca_id = req.params.rca_id;


            console.log(id);
            console.log(rca_id);
            const teamMemberData = req.body;
            console.log(teamMemberData);

            await TeamService.editTeamService(rca_id,id, teamMemberData).then((data) => {
                if (data) {
                    res.status(200).json();
                }
                else {
                    res.status(400).json();
                }
            });
        }
        catch
        {
            res.status(400).json();
        }
    }


}

module.exports = new TeamController();