import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import passport_middleware from "./middleware/passport.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import moviesRouter from "./routes/movies.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

var app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport_middleware(app);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);

export default app;
