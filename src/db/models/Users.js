import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { regulaкExpressionEmail } from '../../constants/auth.js';

const authShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: regulaкExpressionEmail,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

authShema.post('save', handleSaveError);
authShema.pre('findOneAndUpdate', setUpdateSettings);
authShema.post('findOneAndUpdate', handleSaveError);

const UserCollections = model('user', authShema);
export default UserCollections;
