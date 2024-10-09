import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnect } from "./utils/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import categoryRoute from "./routes/categoryRoute.js";

const app = express();
const port = process.env.PORT;
dbConnect();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", userRoute);
app.use("/api/v1", jobRoute);
app.use("/api/v1", categoryRoute);

app.use("/test", (req, res) => {
  return res.status(200).json({ message: "Test success..." });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal server error." });
});

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(port, () => console.log(`Server is running on port:${port}`));
