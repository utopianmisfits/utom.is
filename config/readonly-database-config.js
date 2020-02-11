/**
 * @HACK The reason for this file is only because sequelizer migrations and
 * seeders, require to load the configuration from a JSON/JS file.
 *
 * Since we're using node-config to manage our configuration, this is an
 * attempt to avoid having to duplicate configuration in different files
 *
 * DO NOT MODIFY THIS FILE
 */
const config = require("config");

console.log(config.get("database"));
module.exports = config.get("database");
