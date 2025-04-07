const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["TODO", "INPROGRESS", "DONE"],
      default: "TODO",
    },
  },
  { timestamps: true }
);

taskSchema.plugin(mongoosePaginate);
taskSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("task", taskSchema);
