import createError from "http-errors";
import express, { ErrorRequestHandler } from "express";
import * as path from "path";
import cookieParser from "cookie-parser";

import { loggerMiddleware, errorLoggerMiddleware } from "./shared/logger";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(loggerMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)));

app.use(errorLoggerMiddleware());

// error handler
app.use(errorHandler);

export default app;
