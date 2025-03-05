import olt from "../models/olt";

export async function findAllOltHandler() {
  const ip = (globalThis as any).globalOnuData.ip;
  const port = (globalThis as any).globalOnuData.port;
  if (!ip || !port) {
    throw new Error("Sem nenhum ONU selecionado");
  }
  const olts = await olt.find().exec();
  console.log("todos os olts: ", olts);
  return olts;
}
