import mongoose from 'mongoose';
import { toJSON } from './plugins';
import TokenTypes from '../configs/token';

const tokenSchema = new mongoose.Schema(
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

const Token = mongoose.model('Token', tokenSchema);

export { Token };
