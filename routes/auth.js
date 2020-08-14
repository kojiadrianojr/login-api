const route = require("express").Router();
const User = require("./../model").User;
const mongoose = require("mongoose");
const { validateLogin, validateRegister } = require("./validation.schema");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
// const Speakeasy = require('speakeasy');
const { response } = require("express");


const secret = process.env.SECRET_KEY;


route.post("/register", async (req, res) => {
  const validation = validateRegister(req.body);
  if (validation.error)
    return res.status(400).json(validation.error.details[0].message);
  const { name, email, username, password } = req.body;
  const unique = await User.findOne({ email: email, username: username });
  if (unique) return res.status(400).send("username or email already exist!");
  const hashPass = await argon2.hash(password);
  const user = await new User({
    name,
    email,
    username,
    password: hashPass,
    clean_pass: password
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

route.post("/login", async (req, res) => {
  const validation = validateLogin(req.body);
  if (validation.error)
    return res.status(400).json(validation.error.details[0].message);
  const { username, password } = req.body;
  try {
    let checkUser = await User.findOne({ username });
    if (!checkUser) return res.status(400).json({msg: 'check username or password!!!'})

    // let checkPass = checkUser.clean_pass === password;
    let checkPass = await argon2.verify(checkUser.password, password);
    if (!checkPass) return res.status(400).json({msg: 'check username or password!!!'});
    let encode = jwt.sign({username, password}, secret);
    res.status(200).json({token: encode, userInfo: {
      name: checkUser.name,
      email: checkUser.email,
      id: checkUser.id
    }});
    
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// route.post('auth-totp', (req, res, next) => {
//   var secret = Speakeasy.generateSecret({ length: 15 });
//   response.send({ "secret": secret});
// })

module.exports = route;
