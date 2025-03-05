import onu from "../models/onu";
import { listOnus } from "../treatment/create-list-olt";

(globalThis as any).globalOnuData = {
  ip: "",
  port: "",
  fabricator: "",
};

export async function findByIdOnu(command: any) {
  const onus = await onu.findById(command).exec();

  if (!onus) return null;

  const ip = onus.ip;
  const port = onus.port;
  const fabricator = onus.fabricator;
  (globalThis as any).globalOnuData = { ip, port, fabricator };

  console.log(
    "Variáveis globais atualizadas:",
    (globalThis as any).globalOnuData
  );
  return await onus;
}

console.log((globalThis as any).globalOnuData);
