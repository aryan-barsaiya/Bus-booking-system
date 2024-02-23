import mongoose from "mongoose";
const stationSchema = new mongoose.Schema(
  {
    stationId: {
      type: String,
      required: true,
    },
    busOperated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
      },
    ],
  },
  { timestamps: true }
);

export const station = mongoose.model("Station", stationSchema);
