import mongoose ,{Schema} from "mongoose";
const bookingSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        busId:{
            type:Schema.Types.ObjectId,
            ref:"Bus",
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        SeatNumber:{
            type:Number,
            required:true
        },
        source:{
            type:String,
            required:true
        },
        destination:{
            type:String,
            required:true
        }
    
    },
      { timestamps: true }
);

export const booking = mongoose.model("Booking", bookingSchema);