import { onusInfo } from "../commands/infoDisco";
import Info from "../models/info";

export async function onuInfo() {
  function extractInfo(output: string, regex: RegExp) {
    const matches = output.match(regex);
    if (!matches) return [];

    return matches.map((match) => {
      const parts = match.split(":");
      return parts.length > 1 ? parts[1].trim() : match.trim();
    });
  }

  const res = await onusInfo("display version");
  const regex =
    /VERSION\s*:\s*(MA5800V100R018C\d{2})|PATCH\s*:\s*(SPH102)|PRODUCT\s*:\s*(MA5800-X17)|(\d+ day\(s\), \d+ hour\(s\), \d+ minute\(s\), \d+ second\(s\))/g;

  const extractedInfo = extractInfo(res, regex);
  const infoModel = {
    version: extractedInfo[0],
    patch: extractedInfo[1],
    product: extractedInfo[2],
    uptime: extractedInfo[3],
  };

  const updatedOnu = await Info.findOneAndUpdate(
    { version: extractedInfo[0] },
    infoModel,
    { upsert: true, new: true }
  );

  console.log("Info/ONU no MongoDB:", updatedOnu);
  return updatedOnu;
}
