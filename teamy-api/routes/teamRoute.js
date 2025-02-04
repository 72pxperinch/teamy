import express from 'express';
import User from '../models/userModel.js';
import Team from '../models/teamModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log("Team Get request triggered");
  try {
    const teams = await Team.find().populate('users');
    
    const teamsWithNumberOfUsers = teams.map(team => ({
      _id: team._id,
      name: team.name,
      description: team.description,
      userCount: team.users.length
    }));

    res.send(teamsWithNumberOfUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
});



router.post('/', async (req, res) => {
  console.log("Team Post request triggered");
  try {
    const { name, description, users } = req.body;
    const team = new Team({
      name,
      description,
      users
    });

    const newTeam = await team.save();
    res.status(201).send(newTeam); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => { 
  console.log("Team Get ID request triggered");
  try {
    const team = await Team.findById(req.params.id).populate('users');
    if (!team) {
      return res.status(404).send({ message: 'Team not found' });
    }
    res.send(team);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
});

export default router;
