import mongoose from "mongoose";
const busSchema = new mongoose.Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
        },
        busName: {
            type: String,
            required: true,
        },
        numberOfSeats: {
            type: Number,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        route: [
            {
                stationId: {
                    type: String,
                    required: true
                },
                arrivalTime: {
                    type: String
                }
            }
        ],
        dayOfOperation: {
            monday: {
                type: Boolean,
                default: false
            },
            tuesday: {
                type: Boolean,
                default: false
            },
            wednesday: {
                type: Boolean,
                default: false
            },
            thursday: {
                type: Boolean,
                default: false
            },
            friday: {
                type: Boolean,
                default: false
            },
            saturday: {
                type: Boolean,
                default: false
            },
            sunday: {
                type: Boolean,
                default: false
            }
        }

    },
    { timestamps: true }
);

export const Bus = mongoose.model("Bus", busSchema);
