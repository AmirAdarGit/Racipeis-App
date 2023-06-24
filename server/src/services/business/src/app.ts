import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/db-connection';
import multer from 'multer';

import API_Controller from "./entry-points/api";
import SQS from "./sqs/qsq";
import { Logger } from './logger/src';
import { uploadFile } from "./s3";

const upload = multer({ dest: 'upload/' })

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(cors());
const router: Router = express.Router();
app.use('/', router);

db.getConnection();

// const recipeSQS = new SQS();
// recipeSQS.initialize()
export const logger = Logger.getInstance();
export const USER_PATH = "/user";
export const RECIPES_PATH = "/recipe";
export const UPLOAD_IMAGE_TO_S3 = "/uploadImageToS3";

router.get(`${ USER_PATH }/getUserByAuthId`, async (req: express.Request, res: express.Response) => {
  try {
    logger.info("[USER] - API - getUserById");
    const ApiController = new API_Controller()
    const response = await ApiController.getUserByAuthId(req, res);
    res.json(response).status(200)
  } catch (e: any) {
    logger.error("Internal S erver Error - /getUserById")
    res.json({error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});

router.post(`${ USER_PATH }/create`, async (req: express.Request, res: express.Response) => {
  try {
    logger.info("[USER] - API - createNewUser");
    const ApiController = new API_Controller()
    const response = await ApiController.createNewUser(req, res)
    res.json(response).status(200)
  } catch (e: any) {
    logger.error("Internal Server Error - /createNewUser")
    res.json({error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});

router.post(`${ RECIPES_PATH }/createNewRecipe`, async (req: express.Request, res: express.Response) => {
  try {
    logger.info("[USER] - API - createNewRecipe");
    const apiController = new API_Controller()
    const response = await apiController.createNewRecipe(req, res)
    res.json(response).status(200)
  } catch (e: any) {
    logger.error("Internal Server Error - /createNewRecipe")
    res.json({error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});

router.get(`${ RECIPES_PATH }/getAllRecipesById`, async (req: express.Request, res: express.Response) => {
  try {
    logger.info("[USER] - API - getAllRecipesById");
    const apiController = new API_Controller()
    const response = await apiController.getAllRecipesById(req, res)
    res.json(response).status(200)
  } catch (e: any) {
    logger.error("Internal Server Error - /createNewRecipe")
    res.json({error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});



// TODO: remove the image from /upload in the server
router.post('/uploadImage', upload.single('image'), async (req: express.Request, res: express.Response) => {
  try {
    logger.info("[USER] - API - uploadImage");
    const file = req.file;
    const response = await uploadFile(file);
    if (response) {
      res.send({imagePath: response.Location})
    } else {
      throw new Error("aws upload image error")
    }

  } catch (e: any) {
    logger.error("Internal Server Error - /createNewRecipe")
    res.json({error: `Internal Server Error: ${ e.message }`}).status(500);
  }
});




// TODO: update user


export default app;