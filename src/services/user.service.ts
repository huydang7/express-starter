import httpStatus from "http-status";
import { customAlphabet } from "nanoid";
import { ApiError } from "../exceptions/api-error";
import { User, AffLink } from "../models";

const createUser = async (userBody: any) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const nanoid = customAlphabet("1234567890abcdefghiklmnopqrstuzwxyz", 5);
  const user = await User.create({ ...userBody, shortId: nanoid(5) });
  const affLinks = await AffLink.create([
    { user: user._id, link: nanoid(5), type: "VPS" },
    { user: user._id, link: nanoid(5), type: "TCB" },
  ]);

  user.affLinks.push(...affLinks.map((link: any) => link._id));
  user.save();

  return user;
};

const queryUsers = async (filter: any, options: any) => {
  const users = await User.paginate(filter, {
    ...options,
    populate: "affLinks,affLinks.customers,customers",
    multi: true,
  });
  return users;
};

const getUserById = async (id: string) => {
  return User.findById(id).populate("affLinks");
};

const getUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

const updateUserById = async (userId: string, updateBody: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  delete updateBody.affLinks;
  delete updateBody.customers;

  const res = await User.updateOne({ _id: user.id }, updateBody);
  return res;
};

const deleteUserById = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await User.delete({ _id: user.id });
  return user;
};

export {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
