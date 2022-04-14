const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("", async (req, res, next) => {
  const users = await User.find({}).populate("blogs", {
    title: true,
    author: true,
    url: true,
    id: true,
  });
  res.status(200).send(users);
});

usersRouter.post("", async (req, res, next) => {
  const { username, name, password } = req.body;

  if (!(username && password)) {
    res.status(400).send({ error: "Missing username or password" });
    return;
  }

  if (username.length < 3 || password.length < 3) {
    res.status(400).send({
      error: "Username and password must be at least 3 characters long",
    });
    return;
  }

  const possibleUser = await User.find({ username });

  if (possibleUser.length !== 0) {
    res.status(400).send({ error: "Username already exists" });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;
