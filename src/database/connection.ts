import config from "../configs/config";
import mongoose from "mongoose";
import logger from "../configs/logger";

export const initDb = async () => {
  console.log("initDb");
  mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info("Connected to MongoDB");
  });
};
