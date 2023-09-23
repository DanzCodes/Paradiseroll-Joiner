import { configDotenv } from "dotenv";
import { mongo } from "./db";
import app from "./app";
import bot from "./bot";

configDotenv();

const main = async () => {
  mongo().then(() => {
    bot()
      .then(() => app.listen(3000, () => console.log("Server running on port 3000")))
      .catch((err) => console.error(err));
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});