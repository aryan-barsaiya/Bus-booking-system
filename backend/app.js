import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
//routes import
import userRouter from "./routes/user.js";
import AdminRouter from "./routes/admin.js";
import bookingRouter from "./routes/booking.routes.js";
//routes declaration
app.use("/api/users", userRouter);
app.use("/api/admin", AdminRouter);
app.use("/api", bookingRouter);

export { app };
