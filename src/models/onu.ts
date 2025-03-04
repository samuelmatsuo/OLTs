
import mongoose from "mongoose";

const onuSchema = new mongoose.Schema({
  fsl: { type: String, required: true },
  id_onu: { type: String, required: true },
  description: { type: String, required: true },
  sn: { type: String, required: true },
  control_state: { type: String, required: true },
  run_state: { type: String, required: true },
  config_state: { type: String, required: true },
  match_side: { type: String, required: true },
  protect: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Onu", onuSchema);
