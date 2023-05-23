import UserCollection, { UserCollectionModel } from "./models/user.model";
import { IUser } from "../interfaces";
import { Types } from "mongoose";
import { ObjectId } from 'mongodb';

export default class UserCollectionDBManager {


  async getByUserAuthId(id: string): Promise<UserCollectionModel | null> {
      const user = await UserCollection.findOne({ userAuthId:  id});
      return user || null;
  }
  async create(newUser: IUser): Promise<UserCollectionModel> {
    return await UserCollection.create(newUser);
  }
  //
  // async updateById(id: string, campaignCollection: CampaignCollectionData): Promise<CampaignCollectionModel> {
  //   return await CampaignCollections.findOneAndUpdate({ _id: id }, { $set: campaignCollection }, { new: true });
  // }
  //
  // async deleteById(id: string) {
  //   return await CampaignCollections.deleteOne({ _id: id });
  // }
}