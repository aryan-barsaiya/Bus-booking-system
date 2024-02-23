import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Bus } from "../models/bus.model.js";
import { Admin } from "../models/admin.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { station } from "../models/station.model.js";

// const registerAdmin = async (req, res) => {
//   const { name, email, password, phone, address } = req.body;
//   let user = await Admin.findOne({ email });

//   if (user) {
//     return res.status(400).send("User already exists..");
//   }
//   user = new Admin({ name, email, password, phone, address });

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);

//   await user.save();

//   const jwtSecretKey = "moveinsync";
//   const token = jwt.sign(
//     {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       address: user.address,
//     },
//     jwtSecretKey
//   );

//   res.send(token);
// };

// const loginAdmin = async (req, res) => {
//   let user = await Admin.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send("Invalid email or password...");

//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword)
//     return res.status(400).send("Invalid email or password...");

//   const jwtSecretKey = process.env.JWT_SECRET_KEY;
//   const token = jwt.sign(
//     {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       address: user.address,
//       phone: user.phone,
//     },
//     jwtSecretKey
//   );

//   res.send(token);
// };

const addBus = asyncHandler(async (req, res) => {
  try {
    const { name, numberOfSeats, route, dayOfOperation, phone, email } =
      req.body;
    const user = req.user;

    if (!name || !numberOfSeats || !route) {
      throw new ApiError(400, "All fields are required");
    }

    const newBus = new Bus({
      // admin: new mongoose.Types.ObjectId(user._id),
      busName: name,
      numberOfSeats: numberOfSeats,
      route: route,
      dayOfOperation: dayOfOperation,
      phoneNumber: parseInt(phone),
      email: email,
    });
    await newBus.save();
    newBus.route.forEach(async (ele) => {
      console.log(ele);
      const stationX = await station.find({ stationId: ele.stationId });
      if (stationX.length === 0) {
        const newStation = new station({
          stationId: ele.stationId,
          busOperated: [newBus._id],
        });
        await newStation.save();
        console.log(newStation);
      } else {
        await station.findOneAndUpdate(
          { stationId: ele.stationId },
          {
            $push: {
              busOperated: newBus._id,
            },
          }
        );
      }
    });
    res.send(newBus);
  } catch (error) {
    console.log(error);
  }
});

export { addBus };
