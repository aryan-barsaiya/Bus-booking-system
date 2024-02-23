import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
const demo = (req, res) => {
  return res.status(400).send("demo is here");
};

const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).send("User already exists..");
  }
  user = new User({ name, email, password, phone, address });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const jwtSecretKey = "moveinsync";
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
    jwtSecretKey
  );

  res.send({
    token: token,
    role: user.role,
    name: user.name,
    email: user.email,
    id: user.id,
  });
};

const loginUser = async (req, res) => {
  console.log("d");
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) return res.status(400).send("Invalid email or password...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid email or password...");

  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
    },
    jwtSecretKey
  );
  console.log(token);

  res.send({
    token: token,
    role: user.role,
    name: user.name,
    email: user.email,
    id: user.id,
  });
};

export { demo, registerUser, loginUser };
