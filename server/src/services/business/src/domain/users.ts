import mongoose from "mongoose";
import UserCollectionDBManager from "../db/userCollectionDBManager";
import { IUser } from "../interfaces";

export default class Users {
  private userDBManager = new UserCollectionDBManager();



  async getUserById(id: string) {
    return await this.userDBManager.getById(id);
  }

  async createUser(user: IUser) {
    return await this.userDBManager.create(user);
  }



}
