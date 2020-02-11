import { Sequelize } from "sequelize";
import config from "config";

export default new Sequelize(
  config.get<string>("database.database"),
  config.get<string>("database.username"),
  config.get<string>("database.password"),
  config.get("database"),
);
