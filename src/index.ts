import app from "./app";
import config from "./configs/config";
import { initDb } from "./database/connection";

initDb();
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
