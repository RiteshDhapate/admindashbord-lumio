// all import statements
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import userMetrixRoute from "./routes/usersMatrix.route.js"
import { DBInit } from './db/mongoConnection.js';
//all initialize statements
dotenv.config();
const app = express();


// all middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userMetrixRoute);


DBInit();

// (/) get route
app.get("/", (req, res) => {
    res.send("server is healthy");
})

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
