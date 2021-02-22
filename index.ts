import express from "express";
import * as bodyparser from 'body-parser';
import { VALIDATE_RIDE_ROUTE } from './enums/routes';
import validateLocation from './src/services/validateLocation';
import validateLocationRequest from './src/services/requestTypes/validateLocationRequest';
const port: Number = 8080;

const app: express.Application = express();
app.use(bodyparser.json());

const startServer = async () => {
  app.post(VALIDATE_RIDE_ROUTE, (req: validateLocationRequest, res: express.Response) => {
    validateLocation(req, res);
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
startServer();
export default app;