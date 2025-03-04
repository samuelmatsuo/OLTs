import Onu from "../models/onu";

export async function registerOnuHandler(data: any) {
  const { ip, port, fabricator } = data;
  console.log(ip, port, fabricator);

  if (!ip || !port || !fabricator) {
    console.log("Campos obrigatórios nulos");
  }

  const existingOnu = await Onu.findOne({ port });
  if (existingOnu) {
    console.log("Usuário já existe");
  }

  try {
    const newUser = await Onu.create({
      ip,
      port,
      fabricator,
    });

    console.log("Usuário criado com sucesso", newUser);

    return {
      statusCode: 201,
      message: "Usuário criado com sucesso",
    };
  } catch (error) {
    console.log("Erro ao registrar usuário");
  }
}
