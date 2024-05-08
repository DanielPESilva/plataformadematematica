import express from "express";
import routes from "./routes/index.js";
import { prisma } from "./configs/prismaClient.js";
import cors from "cors";

//instanciando express
const app = express();

// Habilita o CORS para todas as origens
app.use(cors());
// app.use(cors([
//   { origin: ['http://edurondon.tplinkdns.com:3030', 'http://edurondon.tplinkdns.com:3031', 'http://localhost:3030', 'http://localhost:3031'] },
//   { methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] }
// ])); //  Mude apenas isso: origin: ['http://www.section.io', 'http://www.google.com/']

// habilitando o uso de json pelo express
app.use(express.json());

// Passando para o arquivo de rotas o app, que envia junto uma instância do express
routes(app);

// exportando para o server.js fazer uso
export default app
