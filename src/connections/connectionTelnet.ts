import { Telnet } from "telnet-client";
import dotenv from "dotenv";

dotenv.config();
export async function connectionTelnet() {
  const connection = new Telnet();

  const params = {
    host: process.env.TELNET_HOST,
    port: process.env.TELNET_PORT,
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
  } catch (error) {
    console.error("Erro na conexão Telnet:", error);
  }
  return connection;
}
