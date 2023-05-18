import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/db-connection';

import API_Controller from "./entry-points/api";
import SQS from "./sqs/qsq";


dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(cors());
const router: Router = express.Router();
app.use('/', router);

db.getConnection();

const recipeSQS = new SQS();
recipeSQS.initialize()
router.get('/getUserById', async (req: express.Request, res: express.Response) => {
  try {
    console.log("[USER] - API - getUserById");
    const ApiController = new API_Controller()
    const response = await ApiController.getUserById(req, res)
    res.json({ response: response }).status(200)
  } catch (e: any) {
    res.json({ error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});

router.post('/createNewUser', async (req: express.Request, res: express.Response) => {
  try {
    console.log("[USER] - API - createNewUser");
    const ApiController = new API_Controller()
    const response = await ApiController.createNewUser(req, res)
    res.json({ newUser: response }).status(200)
  } catch (e: any) {
    res.json({ error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});

router.post('/createNewRecipe', async (req: express.Request, res: express.Response) => {
  try {
    console.log("[USER] - API - createNewRecipe");
    const apiController = new API_Controller()
    const response = await apiController.createNewRecipe(req, res)
    res.json({ newRecipe: response }).status(200)
  } catch (e: any) {
    res.json({ error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});

// TODO: update user



export default app;