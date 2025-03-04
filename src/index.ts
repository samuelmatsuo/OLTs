import routes from "./routes/routes";
import express from "express";
import dotenv from "dotenv";
import { connectMongo } from "./connections/mongo";

dotenv.config();
// async function main() {
//   await connectMongo();
//   await listOnus();
//   await oltInfo();
// }
// main();

const app = express();
const PORT = process.env.PORT;
connectMongo();
app.use(express.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
