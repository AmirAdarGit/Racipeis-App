import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/db-connection';

import API_Controller from "./entry-points/api";
import SQS from "./sqs/qsq";
import { Logger } from "./logger/logger";


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
export const logger = Logger.getInstance();
export const USER_PATH = "/user";
export const RECIPES_PATH = "/recipe";

router.get(`${USER_PATH}/getById`, async (req: express.Request, res: express.Response) => {
  try {
    console.log("[USER] - API - getUserById");
    const ApiController = new API_Controller()
    const response = await ApiController.getUserById(req, res)
    res.json({ response: response }).status(200)
  } catch (e: any) {
    logger.error("Internal Server Error - /getUserById")
    res.json({ error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});

router.post(`${USER_PATH}/create`, async (req: express.Request, res: express.Response) => {
  try {
    console.log("[USER] - API - createNewUser");
    const ApiController = new API_Controller()
    const response = await ApiController.createNewUser(req, res)
    res.json({ newUser: response }).status(200)
  } catch (e: any) {
    logger.error("Internal Server Error - /createNewUser")
    res.json({ error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});

router.post(`${RECIPES_PATH}/create`, async (req: express.Request, res: express.Response) => {
  try {
    console.log("[USER] - API - createNewRecipe");
    const apiController = new API_Controller()
    const response = await apiController.createNewRecipe(req, res)
    res.json({ newRecipe: response }).status(200)
  } catch (e: any) {
    logger.error("Internal Server Error - /createNewRecipe")
    res.json({ error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});

// TODO: update user



export default app;