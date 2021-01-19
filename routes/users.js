const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route   POST api/users
// desc     Register a user
// @access  Public  
router.post('/', [
  check('name', 'El nombre es requerido').not().isEmpty(),
  check('password', 'Se requieren al menos 6 caracteres para la contraseña').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'el usuario ya existe' });
    }

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }

});


// @route   PUT api/users/:id
// desc     Update User
// @access  Private  
router.put('/:id', auth, async (req, res) => {
  const { checkedCities, checkedCategories } = req.body;
  // Build user object
  const userFields = {};
  if (checkedCities) userFields.ckdCities = checkedCities;
  if (checkedCategories) userFields.ckdCats = checkedCategories;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }


    user = await User.findByIdAndUpdate(req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// @route   Get api/users/:id
// desc     Get Specific User
// @access  Private  
router.get('/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});


module.exports = router;
