import { oltListOnus } from "../commands/infoDisco";
import Onu from "../models/onu";

export async function listOnus() {
  function extractOnus(output: string) {
    const matches = output.match(/^\s*\d+\/\s*\d+\/\d+\s+\d+\s+(.+)$/gm);
    return matches
      ? matches.map((line) => line.trim().split(/\s+/).slice(2).join(" "))
      : [];
  }

  async function run() {
    try {
      const res = await oltListOnus("display ont info 0 1 2 all");

      const descriptions = extractOnus(res);
      if (!descriptions.length) {
        console.warn("Nenhuma ONU encontrada!");
        return;
      }

      const metadeLength = Math.floor(descriptions.length / 2);
      const length = descriptions.length;
      const description = "";
      for (let i = 0; i < metadeLength; i++) {
        const obj = descriptions[i].split(" ");
        const onuData = {
          id_onu: obj[0],
          sn: obj[1],
          control_state: obj[2],
          run_state: obj[3],
          config_state: obj[4],
          match_side: obj[5],
          protect: obj[6],
        };

        const novaOnu = await Onu.create(onuData);
        await novaOnu.save();
        console.log("Criando ONU no MongoDB:", novaOnu);
      }
      for (let i = metadeLength; i < length; i++) {
        const obj = descriptions[i].split(" ");
        const onuData = {
          id_onu: obj[0],
          description: obj.slice(1).join(" "),
        };
        const updatedOnu = await Onu.findOneAndUpdate(
          { id_onu: obj[0] },
          { description: obj[1] },
          { new: true }
        );
        console.log(onuData);
      }
    } catch (error) {
      console.error("Erro ao listar ONUs:", error);
    }
  }

  return run();
}
