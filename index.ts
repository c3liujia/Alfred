import express from "express";
import * as bodyparser from 'body-parser';
import { VALIDATE_RIDE_ROUTE } from './enums/routes';
const port: Number = 3000;

const app: express.Application = express();
app.use(bodyparser.json());

const startServer = async () => {
  app.post(VALIDATE_RIDE_ROUTE, (req: express.Request, res: express.Response) => {
    res.status(200).send('Request received!')
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
startServer();
export default app;