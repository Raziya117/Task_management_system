// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, default: "" },
//   status: { type: String, default: "todo" }, // todo, in-progress, done
//   deadline: Date,
//   board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Task", taskSchema);
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: "todo" },
  startDate: Date,   // <-- New start date
  deadline: Date,    // <-- Existing deadline
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", taskSchema);
