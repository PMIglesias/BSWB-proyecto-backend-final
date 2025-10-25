import mongoose from "mongoose";

const TurnoSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente", required: true },
  fechaHora: { type: String, required: true } // lo conservamos como string "YYYY-MM-DD HH:MM"
}, {
  timestamps: true
});

export default mongoose.model("Turno", TurnoSchema);
