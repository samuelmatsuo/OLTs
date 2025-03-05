import express from "express";
import { listOnus } from "../treatment/create-list-olt";
import { onuInfo } from "../treatment/onu-info";
import { registerOnuHandler } from "../handler/register-onu-handler";
import { findByIdOnu } from "../handler/find-by-id-onu-handler";
import { findAllOltHandler } from "../handler/find-all-olt-handler";
import { findAllOnuHandler } from "../handler/find-all-onu-handler";

const app = express();

app.use(express.json());
//rota para criar onu
app.post("/create-onu", async (req, res) => {
  try {
    const onu = registerOnuHandler(req.body);
    res.send(onu);
  } catch (error) {
    res.status(500).send("Erro ao criar Onu");
  }
});
//rota para buscar todos os onus
app.get("/all-onus", async (req, res) => {
  try {
    const data = await findAllOnuHandler();
    res.send("OK\n" + data);
  } catch (error: Error | any) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});
//rota para buscar onu pelo id
app.get("/find-onu-id", async (req, res) => {
  try {
    const onu = await findByIdOnu(req.headers["id"]);
    res.send(onu);
  } catch (error) {
    res.status(500).send("Erro ao buscar Onu");
  }
});
//rota para buscar as informacoes da onu
app.get("/onu-info", async (req, res) => {
  try {
    const info = await onuInfo();
    res.send("OK\n" + info);
  } catch (error) {
    res.status(500).send("Erro ao listar ONUs");
  }
});
//rota para salvar em banco as olts
app.get("/list-olt", async (req, res) => {
  try {
    await listOnus();
    res.send("OK");
  } catch (error: Error | any) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});
//rota para busca todoas as olts
app.get("/all-olts", async (req, res) => {
  try {
    const data = await findAllOltHandler();
    res.send("OK\n" + data);
  } catch (error: Error | any) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

export default app;
