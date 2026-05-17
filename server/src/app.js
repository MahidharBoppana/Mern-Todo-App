import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todo.routes.js";
import errorMiddleware from "./middleware/src/middleware/error.middleware.js";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Routes
app.use("/api/todos", todoRoutes);

app.use(errorMiddleware);

export default app;
