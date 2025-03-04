import mongoose from "mongoose";

const onuSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  port: { type: String, required: true },
  fabricator: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Onu", onuSchema);
