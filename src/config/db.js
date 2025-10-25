import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const conectarDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI no definido en .env");
    await mongoose.connect(uri, {
      // opciones por defecto de mongoose 7+
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};
