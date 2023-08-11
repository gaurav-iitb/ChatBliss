const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const cors = require("cors")
const port = process.env.PORT || 8000;

dotenv.config();

mongoose.connect(process.env.SECRET_MONGO_KEY,  { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("mongodb database is connected");
});

// below are middlewares. Definition:- Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users" , userRoute) 
app.use("/api/auth" , authRoute) 
app.use("/api/posts" , postRoute) 
app.get("/", (req, res) => res.status(200).send("hello world"));
app.get("/api", (req, res) => res.status(200).send("api works"));

app.listen(port, () => console.log(`listening on local host: ${port}`));
