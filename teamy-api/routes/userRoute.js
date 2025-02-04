import express from 'express';
import User from '../models/userModel.js';
const router = express.Router();


router.get('/', async (req, res) => {
  console.log("User Get request triggered");
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 20; // Default limit to 20 if not provided
  const nameQuery = req.query.name;
  const domainQuery = req.query.domain;
  const genderQuery = req.query.gender;
  const availabilityQuery = req.query.availability;

  try {
    let query = {};

    if (nameQuery) {
      query = {
        ...query,
        $or: [
          { first_name: { $regex: nameQuery, $options: 'i' } },
          { last_name: { $regex: nameQuery, $options: 'i' } },
        ],
      };
    }

    if (domainQuery) {
      query = {
        ...query,
        domain: { $regex: domainQuery, $options: 'i' },
      };
    }

    if (genderQuery) {
      query.gender = genderQuery;
    }
    if (availabilityQuery !== undefined) {
      query.available = availabilityQuery.toLowerCase() === 'true';
    }

    const count = await User.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    const users = await User.find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    res.send({
      users,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving users' });
  }
});




router.put('/:id', async (req, res) => {
  console.log("User Put request triggered");
  const userId = req.params.id;
  
  try {
    const user = await User.findOne({ id: userId });

    if (user) {
      const defaultValues = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        avatar: user.avatar,
        domain: user.domain,
        available: user.available
      };
      user.first_name = req.body.first_name || defaultValues.first_name;
      user.last_name = req.body.last_name || defaultValues.last_name;
      user.email = req.body.email || defaultValues.email;
      user.gender = req.body.gender || defaultValues.gender;
      user.avatar = req.body.avatar || defaultValues.avatar;
      user.domain = req.body.domain || defaultValues.domain;
      user.available = req.body.available || defaultValues.available;

      const updatedUser = await user.save();
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


router.post('/', async (req, res) => {
  console.log("User Post request triggered");
  try {
    let availability = false;
    if (req.body.available == "true") {
      availability = true;
    }
    const largestIdUser = await User.findOne().sort({ id: -1 });
    let newId = 1;
    if (largestIdUser) {
      newId = largestIdUser.id + 1;
    }
    const user = new User({
      id: newId, 
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      avatar: req.body.avatar,
      domain: req.body.domain,
      available: availability,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: 'Invalid User Data.' });
  }
});




router.delete('/:id', async (req, res) => {
  console.log("User Delete request triggered");
  try {
    const userId = req.params.id;
    const deletedUser = await User.findOneAndDelete({ id: userId });
    if (deletedUser) {
      res.send({ message: 'User deleted successfully.' }); 
    } else {
      res.status(404).send({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user.', error: error.message });
  }
});





export default router;
