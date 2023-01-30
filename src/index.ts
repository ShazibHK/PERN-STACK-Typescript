import express from 'express';
import cors from "cors"
import customerAPI from "./api/customerAPI"
import { config } from "dotenv"
import bodyParser, { json } from 'body-parser';
const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;
app.use(cors())
app.use(json())
app.use(bodyParser.json())
app.use(express.json());
app.use('/customerAPI', customerAPI);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});