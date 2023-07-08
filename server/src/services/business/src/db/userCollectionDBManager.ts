import UserCollection, { UserCollectionModel } from "./models/user.model";
import { IUser } from "../interfaces";
import { Types } from "mongoose";
import { ObjectId } from 'mongodb';

export default class UserCollectionDBManager {


  async getByUserAuthId(id: string): Promise<UserCollectionModel | null> {
      let user = await UserCollection.findOne({ userAuthId:  id});
    if (user) {
      await UserCollection.updateOne({ userAuthId: id }, { $set: { isLogIn: true } });
    }
      return user || null;
  }
  async create(newUser: IUser): Promise<UserCollectionModel> {
    return await UserCollection.create(newUser);
  }

  async updateUserIsLogIn(userAuthId: string, isLogIn: boolean): Promise<UserCollectionModel | null> {

    const user =  await UserCollection.findOneAndUpdate(
      { userAuthId: userAuthId },
      { $set: { isLogIn: isLogIn } },
    );
    return user || null
  }

}