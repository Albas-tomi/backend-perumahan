import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import perumahanRoute from "./src/routes/perumahanRoute.js";
import penghuniRoute from "./src/routes/penghuniRoute.js";
import pembayaranRoute from "./src/routes/pembayaranRoute.js";
import pengeluaranRoute from "./src/routes/pengeluaranRoute.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
  })
);
app.use(cookieParser());
app.use(express.json());

// ROUTE
app.use(perumahanRoute);
app.use(penghuniRoute);
app.use(pembayaranRoute);
app.use(pengeluaranRoute);

app.listen(PORT, () =>
  console.log(`the server is running on port ${PORT}....`)
);
