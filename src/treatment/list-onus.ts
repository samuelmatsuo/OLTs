import { oltListOnus } from "../commands/infoDisco";

export async function listOnus() {
  function extractOnus(output: string) {
    const matches = output.match(/^\s*\d+\/\s*\d+\/\d+\s+\d+\s+(.+)$/gm);
    return matches
      ? matches.map((line) => line.trim().split(/\s+/).slice(2).join(" "))
      : [];
  }

  async function run() {
    try {
      const res = await oltListOnus("display ont info 0 1 1 all");
      const descriptions = extractOnus(res);

      if (!descriptions.length) {
        console.warn("Nenhuma ONU encontrada!");
        return;
      }

      const metadeLength = Math.floor(descriptions.length / 2);
      const length = descriptions.length;
      let contador = 0;
      let contador2 = metadeLength;
      let teste1 = [];
      let teste2 = [];
      while (contador < metadeLength) {
        const obj = descriptions[contador].split(" ");
        const teste1 = [
          {
            id: obj[0],
            sn: obj[1],
            control_state: obj[2],
            run_state: obj[3],
            config_state: obj[4],
            match_side: obj[5],
            protect: obj[6],
          },
        ];
        contador++;
        console.log(teste1[0]);
      }
      while (contador2 < length) {
        const obj = descriptions[contador2].split(" ");
        const teste2 = [
          {
            id: obj[0],
            description: obj.slice(1).join(" "),
          },
        ];
        contador2++;
        console.log(teste2[0]);
      }
    } catch (error) {
      console.error("Erro ao listar ONUs:", error);
    }
  }

  return run();
}
