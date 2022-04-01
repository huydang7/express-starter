const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const affLinkSchema = mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
      trim: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
    type: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: "active",
    },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
affLinkSchema.index({ link: 1, type: 1 }, { unique: true, sparse: true });

affLinkSchema.plugin(toJSON);
affLinkSchema.plugin(paginate);
const AffLink = mongoose.model("AffLink", affLinkSchema);

export { AffLink };
