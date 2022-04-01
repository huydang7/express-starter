import { IUser } from "../models";

const { Customer, User, AffiliateLink } = require("../models");

const upsertCustomer = async (customerBody: any, updatedByAdmin: boolean) => {
  const affLink = await AffiliateLink.findOne({
    link: customerBody.affLink,
  });
  const user = await User.findOne({ _id: affLink && affLink.user });
  delete customerBody.link;
  delete customerBody.user;

  const payload = {
    ...customerBody,
  };
  if (user && user.id) {
    payload.user = user.id;
  }
  if (affLink && affLink.id) {
    payload.link = affLink.id;
  }

  if (!updatedByAdmin) {
    delete payload.registered;
  }
  const result = await Customer.findOneAndUpdate(
    {
      shortId: customerBody.shortId,
    },
    { ...payload },
    { upsert: true, new: true }
  );

  if (user) {
    user.update({ $addToSet: { customers: result.id } }).exec();
  }
  if (affLink) {
    affLink.update({ $addToSet: { customers: result.id } }).exec();
  }

  return result;
};

const getCustomers = async (filter: any, options: any) => {
  const customers = await Customer.paginate(filter, {
    ...options,
    populate: "link,user",
    multi: true,
  });
  return customers;
};

export { upsertCustomer, getCustomers };
