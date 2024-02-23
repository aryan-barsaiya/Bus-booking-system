import { station } from "../models/station.model.js";
import { Bus } from "../models/bus.model.js";
import { booking } from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const findBuses = asyncHandler(async (req, res) => {
  const { source, destination, date } = req.body;
  if (!source || !destination || !date) {
    throw new ApiError(400, "All fields are required");
  }
  const dt = new Date(date);
  const day = dt.getDay();
  const sourceBuses = await station.aggregate([
    {
      $match: { stationId: source },
    },
    {
      $lookup: {
        from: "buses", // The name of the collection
        localField: "busOperated",
        foreignField: "_id",
        as: "buses",
      },
    },
  ]);

  const destinationBuses = await station.aggregate([
    {
      $match: { stationId: destination },
    },
    {
      $lookup: {
        from: "buses", // The name of the collection
        localField: "busOperated",
        foreignField: "_id",
        as: "buses",
      },
    },
  ]);
  console.log(sourceBuses[0].buses, destinationBuses[0].buses);

  if (!sourceBuses || !destinationBuses) {
    return res
      .status(201)
      .json(new ApiResponse(200, commonBuses, "No Buses Found"));
  }
  let commonBuses = [];
  sourceBuses[0].buses.forEach((obj1) => {
    if (destinationBuses[0].buses.find(({ name }) => name === obj1.name))
      commonBuses.push(obj1);
  });
  if (!commonBuses) {
    return res
      .status(201)
      .json(new ApiResponse(200, commonBuses, "No Buses Found"));
  }
  commonBuses.filter((bus) => {
    if (bus.dayOfOperation[day] == true) {
      return bus;
    }
  });
  commonBuses.filter((bus, index, self) => {
    return index === self.findIndex((b) => b.name === bus.name);
  });
  let dataToSend = [];
  for (let bus of commonBuses) {
    const busId = bus._id;
    const bookedSeats = await booking
      .find({ busId: busId, date: dt })
      .populate("busId");
    const obj = {
      _id: bus._id,
      busName: bus.busName,
      numberOfSeats: bus.numberOfSeats,
      route: bus.route,
      dayOfOperation: bus.dayOfOperation,
      phoneNumber: bus.phoneNumber,
      email: bus.email,
      noOfBookedSeats: bookedSeats.length,
    };
    console.log("1", obj);
    dataToSend.push(obj);
  }
  console.log("2", dataToSend);
  return res
    .status(201)
    .json(new ApiResponse(200, dataToSend, "Buses fetched Successfully"));
});

const findBusDetails = asyncHandler(async (req, res) => {
  const { busId, source, destination, date } = req.body;
  const id = new mongoose.Types.ObjectId(busId);
  const dt = new Date(date);
  const bookedSeats = await booking
    .find({ busId: id, date: dt })
    .populate("busId");

  return res
    .status(200)
    .json(new ApiResponse(200, bookedSeats, "Buses deatils Successfully"));
});

const myBookings = asyncHandler(async (req, res) => {
  const { user, id } = req.body;
  const userId = new mongoose.Types.ObjectId(id);
  const bookings = await booking.find({ user: userId });
  return res.status(201).json(new ApiResponse(200, bookings, "All Bookings"));
});

const bookaSeat = asyncHandler(async (req, res) => {
  const { seats, busId, dt, source, destination, userId } = req.body;
  console.log(seats, busId, dt, source, destination, userId);
  console.log(userId, busId);
  for (let idx = 0; idx < seats.length; idx++) {
    const ele = seats[idx];
    const newBooking = new booking({
      user: userId,
      busId: busId,
      date: new Date(dt),
      SeatNumber: parseInt(ele),
      source,
      destination,
    });

    await newBooking.save();
    console.log(newBooking, "newBooking");
  }

  return res.status(201).json(new ApiResponse(200, "Booking Successfully"));
});

const cancelBooking = async (req, res) => {
  const { busId, dt, userId } = req.body;
  console.log(busId, dt, userId);
  const date = new Date(dt);
  await booking.deleteMany({
    busId,
    date,
    user: userId,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, "Booking cancelled Sucessfully"));
};

export { findBuses, findBusDetails, myBookings, bookaSeat, cancelBooking };
