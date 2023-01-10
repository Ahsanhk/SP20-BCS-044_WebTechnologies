import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

//app config
const app = express();
const port = 8000;

//middlwares
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/review", blogRouter);

//db config
const connection_url =
  "mongodb+srv://admin:abcd1234@cluster0.imyamaj.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connection_url)
  .then(() => console.log("connected!!!"))
  .catch((err) => console.log(err));

//listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
