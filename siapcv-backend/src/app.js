import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import cvRoutes from "./routes/cvRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cvs", cvRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "SiapCV Backend API is running!" });
});

export default app;
