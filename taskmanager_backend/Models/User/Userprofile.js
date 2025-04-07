const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  country: {
    type: String,
    required: [true, "Country is Required"],
  },
  city: {
    type: String,
    required: [true, "City is Required"],
  },
  state: {
    type: String,
    required: [true, "State is Required"],
  },
  street: {
    type: String,
    required: [true, "Street is Required"],
  },
});

const userprofileSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE", "OTHERS"],
    },
    location: {
      type: locationSchema,
      required: true,
    },
    image: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
  },
  { timestamps: true }
);

userprofileSchema.plugin(mongoosePaginate);
userprofileSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("userprofile", userprofileSchema);