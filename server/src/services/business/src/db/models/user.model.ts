import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isLogIn: {
    type: Boolean,
    required: true
  },
});

export interface UserCollectionModel extends mongoose.Document {
  name: string,
  email: string,
  isLogIn: boolean,
}



const UserCollection = mongoose.model<UserCollectionModel>('User', userSchema);

export default UserCollection;
