import { AsyncLocalStorage } from "async_hooks";
import { connectMongo } from "./connections/mongo";
import { listOnus } from "./treatment/list-onus";
import { oltInfo } from "./treatment/olt-info";

async function main() {
  await connectMongo();
  console.log("Banco de dados conectado, iniciando listOnus...");
  await listOnus();
}
main();
//oltInfo("version");
