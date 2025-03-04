import { oltListOnus } from "../commands/infoDisco";
import Onu from "../models/onu";

const command = ["display ont info 0 1 2 all", "display ont info 0 1 1 all"];
export async function listOnus() {
  function extractOnus(output: string, fsp: string) {
    const matches = output.match(/^\s*\d+\/\s*\d+\/\d+\s+\d+\s+(.+)$/gm);
    return matches
      ? matches.map((line) => {
          const parts = line.trim().split(/\s+/);
          return fsp + " " + parts.slice(2).join(" ");
        })
      : [];
  }

  function extractFSP(command: string) {
    const parts = command.split(" ");
    return parts.length >= 4 ? parts.slice(3, 6).join("/") : "";
  }

  async function run() {
    const commandLength = command.length;
    for (let i = 0; i < commandLength; i++) {
      try {
        const fsp = extractFSP(command[i]);
        if (!fsp) {
          console.warn("F/S/P inválido no comando!");
          return;
        }

        const res = await oltListOnus(command[i]);
        const descriptions = extractOnus(res, fsp);
        if (!descriptions.length) {
          console.warn("Nenhuma ONU encontrada!");
          return;
        }
        console.log(descriptions);

        const metadeLength = Math.floor(descriptions.length / 2);
        const length = descriptions.length;

        let dataDescriptionArray = [];
        let dataInfoArray = [];

        for (let i = metadeLength; i < length; i++) {
          const obj = descriptions[i].split(" ");
          dataDescriptionArray.push({
            id_onu: obj[1],
            description: obj.slice(2).join(" "),
          });
        }

        for (let i = 0; i < metadeLength; i++) {
          const obj = descriptions[i].split(" ");
          const description = dataDescriptionArray.find(
            (item) => item.id_onu === obj[1]
          );
          dataInfoArray.push({
            fsl: fsp,
            id_onu: obj[1],
            description: description ? description.description : "",
            sn: obj[2],
            control_state: obj[3],
            run_state: obj[4],
            config_state: obj[5],
            match_side: obj[6],
            protect: obj[7],
          });

          const updatedOnu = await Onu.findOneAndUpdate(
            { id_onu: obj[1], fsl: fsp },
            dataInfoArray[i],
            { upsert: true, new: true }
          );
          console.log("ONU no MongoDB:", updatedOnu);
        }
      } catch (error) {
        console.error("Erro ao listar ONUs:", error);
      }
    }
  }
  return run();
}
