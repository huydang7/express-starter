import bcrypt from 'bcryptjs';
import mongoose, { Document } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2';
import validator from 'validator';
import { Role } from '../configs/roles';
import { toJSON } from './plugins';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role | string;
  isEmailVerified: boolean;
  isPasswordMatch(password: string): Promise<boolean>;
  getUpdate(): any;
}

interface UserModel
  extends mongoose.PaginateModel<IUser>,
    mongooseDelete.SoftDeleteModel<IUser> {
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
      default: Role.USER,
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
userSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

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

userSchema.pre('updateOne', async function (next) {
  const data = this.getUpdate();
  if (!data.password) {
    return next();
  }
  try {
    const hashPassword = await bcrypt.hash(data.password, 8);
    data.password = hashPassword;
    next();
  } catch (error) {
    return next();
  }
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export { User };
