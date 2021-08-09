const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      maxlength: 100,
    },
    content: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      enum: ["NOT_DONE", "DONE"],
      default: "NOT_DONE",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
