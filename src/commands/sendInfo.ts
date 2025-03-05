import { connectionTelnet } from "../connections/connectionTelnet";

export async function oltListOnus(command: string) {
  const connection = await connectionTelnet();

  await connection.send("admin", { waitFor: "User password:" });
  await connection.send("admin", { waitFor: ">" });

  await new Promise((res) => setTimeout(res, 1000));

  await connection.send(command, { waitFor: ">" });
  const res = await connection.send("\r\n", { waitFor: ">" });

  //console.log("Resposta do comando:\n", res);

  return res;
}

export async function onusInfo(command: string) {
  const connection = await connectionTelnet();

  await connection.send("admin", { waitFor: "User password:" });
  await connection.send("admin", { waitFor: ">" });

  await new Promise((res) => setTimeout(res, 1000));

  const res = await connection.send(command, { waitFor: ">" });

  return res;
}
