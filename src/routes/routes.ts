import express from "express";
import { listOnus } from "../treatment/list-olt";
import { onuInfo } from "../treatment/onu-info";
import { registerOnuHandler } from "../handler/register-onu-handler";
import { findByIdOnu } from "../handler/find-by-id-onu-handler";

const app = express();

app.use(express.json());

app.get("/list-onus", async (req, res) => {
  try {
    await listOnus();
    res.send("OK");
  } catch (error) {
    res.status(500).send("Erro ao listar Onus");
  }
});
app.get("/olt-info", async (req, res) => {
  try {
    const info = await onuInfo();
    res.send("OK\n" + info);
  } catch (error) {
    res.status(500).send("Erro ao listar Onus");
  }
});

app.post("/create-onu", async (req, res) => {
  try {
    const onu = registerOnuHandler(req.body);
    res.send(onu);
  } catch (error) {
    res.status(500).send("Erro ao criar Onu");
  }
});

app.get("/find-onu", async (req, res) => {
  try {
    const onu = await findByIdOnu(req.headers["id"]);
    res.send(onu);
  } catch (error) {
    res.status(500).send("Erro ao criar Onu");
  }
});
export default app;
