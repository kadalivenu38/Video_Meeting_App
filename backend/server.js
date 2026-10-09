import express from "express";
import "dotenv/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { handleClerkWebhook } from "./controllers/webhookController.js";

// server instance
const app = express();

// Connect to Neon & Initialize tables
initDB();

// built-in middleware's
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

app.use(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  handleClerkWebhook,
);
app.use(express.json());
app.use(clerkMiddleware());

const PORT = process.env.PORT;
// api routes
app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
