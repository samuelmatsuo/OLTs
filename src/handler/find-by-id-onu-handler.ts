import onu from "../models/onu";

export async function findByIdOnu(command: any) {
  return await onu.findById(command).exec();
}
