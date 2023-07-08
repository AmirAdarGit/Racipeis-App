import mongoose from "mongoose";
import UserCollectionDBManager from "../db/userCollectionDBManager";
import { IUser } from "../interfaces";

export default class Users {
  private userDBManager = new UserCollectionDBManager();



  async getUserByAuthId(id: string) {
    return await this.userDBManager.getByUserAuthId(id);
  }

  async createUser(user: IUser) {
    return await this.userDBManager.create(user);
  }
  async updateUserIsLogIn(userAuthId: string, isLogIn: boolean) {
    return await this.userDBManager.updateUserIsLogIn(userAuthId, isLogIn);
  }



}
