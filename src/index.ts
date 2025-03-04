import { AsyncLocalStorage } from "async_hooks";
import { connectMongo } from "./connections/mongo";
import { listOnus } from "./treatment/list-onus";
import { oltInfo } from "./treatment/olt-info";

async function main() {
  await connectMongo();
  await listOnus();
  //await oltInfo();
}
main();
