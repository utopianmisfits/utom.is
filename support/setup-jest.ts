import db from "../db";

db.sync({
  logging: false,
  force: true,
});
