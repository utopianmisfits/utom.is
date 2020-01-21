import config from "config";
import express, { ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import createError from "http-errors";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

import cookieParser from "cookie-parser";

import { loggerMiddleware, errorLoggerMiddleware } from "./shared/logger";

const app = express();

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};

app.use(loggerMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: config.get<number>("server.rateLimit.windowMs"),
    max: config.get<number>("server.rateLimit.max"),
  }),
);
app.use("/", indexRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)));

app.use(errorLoggerMiddleware());

// error handler
app.use(errorHandler);

export default app;
