import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
  version: { type: String, required: true },
  patch: { type: String, required: true },
  product: { type: String, required: true },
  uptime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Info", infoSchema);
