import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function connectMongo() {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error("ERRO: A variável de ambiente MONGO_URL não está definida!");
    process.exit(1);
  }

  mongoose
    .connect(mongoUrl)
    .then(() => console.log("Conectado ao MongoDB com sucesso!"))
    .catch((err) => {
      console.error("Erro ao conectar ao MongoDB:", err);
      process.exit(1);
    });
}
