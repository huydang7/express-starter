import mongoose, { Document } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import TokenTypes from '../configs/token';
import { toJSON } from './plugins';
import { IUser } from './user.model';

export interface IToken extends Document {
  token: string;
  user: IUser | string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}

interface TokenModel
  extends mongoose.PaginateModel<IToken>,
    mongooseDelete.SoftDeleteModel<IToken> {}

const tokenSchema = new mongoose.Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        TokenTypes.REFRESH,
        TokenTypes.RESET_PASSWORD,
        TokenTypes.VERIFY_EMAIL,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

tokenSchema.plugin(toJSON);

const Token = mongoose.model<IToken, TokenModel>('Token', tokenSchema);

export { Token };
