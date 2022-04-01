import mongoose from "mongoose";
import { toJSON, paginate } from "./plugins";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    cccd: {
      type: String,
      trim: true,
      sparse: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    registered: {
      type: Boolean,
      default: false,
    },
    link: { type: mongoose.Schema.Types.ObjectId, ref: "AffLink" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
