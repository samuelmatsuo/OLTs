import { Telnet } from "telnet-client";
import dotenv from "dotenv";

dotenv.config();
export async function connectionTelnet() {
  const connection = new Telnet();

  const ip = (globalThis as any).globalOnuData.ip;
  console.log(ip);
  const port = (globalThis as any).globalOnuData.port;
  console.log(port);

  const params = {
    host: ip,
    port: port,
    timeout: 5000,
    shellPrompt: ">",
    loginPrompt: process.env.TELNET_LOGIN_PROMPT,
    passwordPrompt: process.env.TELNET_PASSWORD_PROMPT,
    username: process.env.TELNET_USERNAME,
    password: process.env.TELNET_PASSWORD,
    debug: true,
  };

  try {
    await connection.connect(params);
    console.log("Conexão realizada com sucesso!");
    return connection;
  } catch (error) {
    console.error("Erro na conexão Telnet:", error);
    throw new Error("Erro na conexão Telnet");
  }
  return connection;
}
