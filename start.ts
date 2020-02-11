/**
 * Module dependencies.
 */

import config from "config";
import app from "./app";
import sequelize from "./db";
import debugCt from "debug";
import http from "http";
import { HttpError } from "http-errors";

const debug = debugCt("utom.is:server");

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): string | number | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.get("server.port"));

app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      return process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      return process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.on("error", onError);
server.on("listening", onListening);

sequelize.sync().then(() => server.listen(port));
