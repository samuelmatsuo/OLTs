import { oltVersion } from "../commands/infoDisco";

export async function oltInfo(info: string) {
  function extractInfo(output: string, info: string) {
    const regex = new RegExp(`${info}\\s*:\\s*(\\S+)`, "i");
    const match = output.match(regex);
    return match ? match[1] : `${info} não encontrada`;
  }

  const res = await oltVersion("display version");
  const extractedInfo = extractInfo(res, info);
  console.log(extractedInfo);

  return extractedInfo;
}
