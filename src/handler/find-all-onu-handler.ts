import onu from "../models/onu";

export async function findAllOnuHandler() {
  const ip = (globalThis as any).globalOnuData.ip;
  const port = (globalThis as any).globalOnuData.port;
  if (!ip || !port) {
    throw new Error("Sem nenhum ONU selecionado");
  }
  const onus = await onu.find().exec();
  console.log("todos as ONUs: ", onus);
  return onus;
}
