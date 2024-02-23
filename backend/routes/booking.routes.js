import { Router } from "express";
import {
  bookaSeat,
  cancelBooking,
  findBusDetails,
  findBuses,
  myBookings,
} from "../controller/booking.controllers.js";
// import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/findBuses").post(findBuses);
router.route("/findBusDetails").post(findBusDetails);
router.route("/bookaseat").post(bookaSeat);
router.route("/mybookings").post(myBookings);
router.route("/cancelbooking").post(cancelBooking);

export default router;