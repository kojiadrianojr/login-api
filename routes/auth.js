const route = require("express").Router();
const User = require("./../model").User;
const secret = process.env.SECRET_KEY;
const { validateLogin, validateRegister } = require("./module/validation.schema");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Speakeasy = require("speakeasy");
const mail_otp = require("./module/nodemailer");
const authenticate = require("./auth-token");

route.post("/register", async (req, res) => {
  const otp_secret = Speakeasy.generateSecret({
    length: 20,
  });
  const validation = validateRegister(req.body);
  if (validation.error)
    return res.status(400).json(validation.error.details[0].message);
  const { name, email, username, password } = req.body;
  const unique_email = await User.findOne({
    email: email,
  });
  const unique_username = await User.findOne({
    username: username,
  })
  if (unique_email) return res.status(406).send("username or email already exist!");
  if (unique_username) return res.status(406).send("username or email already exist!");
  const hashPass = await argon2.hash(password);
  const user = await new User({
    name,
    email,
    username,
    password: hashPass,
    clean_pass: password,
    secret: otp_secret.base32,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({
      user: savedUser.name,
      msg: "Kudos on registration! Please login.",
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

route.post("/validate", async (req, res) => {
  let userInfo = await User.findOne({
    email: req.body.email,
  });
  try {
    res.send({
      otp_granted: Speakeasy.totp.verify({
        secret: userInfo.secret,
        encoding: "base32",
        token: req.body.otpToken,
        window: 0,
      }),
    });
  } catch (e) {
    res.json({ msg: e.message });
  }
});

route.post("/generate_otp", authenticate, async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    let token = Speakeasy.totp({
      secret: user.secret,
      encoding: "base32",
    });

    mail_otp({ reciepient: email, otp: token });
  } catch (e) {
    res.json({ msg: e.message });
  }
});

route.post("/login", async (req, res) => {
  const validation = validateLogin(req.body);
  if (validation.error)
    return res.status(400).json(validation.error.details[0].message);
  const { username, password } = req.body;
  try {
    let checkUser = await User.findOne({
      username,
    });
    let email = checkUser.email;
    let otp_secret = checkUser.secret;
    let token = Speakeasy.totp({
      secret: otp_secret,
      encoding: "base32",
    });

    if (!checkUser)
      return res.status(400).json({
        msg: "check username or password!!!",
      });
    // let checkPass = checkUser.clean_pass === password;
    let checkPass = await argon2.verify(checkUser.password, password);
    if (!checkPass)
      return res.status(400).json({
        msg: "check username or password!!!",
      });
    let encode = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        username,
        password,
      },
      secret
    );
    mail_otp({
      reciepient: email,
      otp: token,
    });
    res.status(200).json({
      token: encode,
      userInfo: {
        name: checkUser.name,
        email: checkUser.email,
        id: checkUser.id,
      },
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = route;
