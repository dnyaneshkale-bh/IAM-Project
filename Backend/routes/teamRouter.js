const express = require('express');
const router = express.Router({mergeParams:true});
const teamController = require('../controller/teamController');

router.put('/:id', teamController.editTeam);
router.delete('/:id', teamController.deleteTeam);
router.post('', teamController.createTeamMember);
router.get('/', teamController.getTeamMembers);

module.exports = router;