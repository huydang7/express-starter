import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { toJSON } from './plugins';
import { Role } from '../configs/roles';
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role | string;
  isEmailVerified: boolean;
  isPasswordMatch(password: string): Promise<boolean>;
}

interface UserModel
  extends mongoose.PaginateModel<IUser>,
    mongoose_delete.SoftDeleteModel<IUser> {
  isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number',
          );
        }
      },
      private: true,
    },
    role: {
      type: String,
      enum: Role,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(toJSON);
userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongoose_delete, { deletedAt: true, overrideMethods: 'all' });

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export { User };
