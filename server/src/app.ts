import cors from "cors";
import morgan from "morgan";
import express from "express";
import authRoutes from "./routes/auth.routes";
import accountsRoutes from "./routes/accounts.routes";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(accountsRoutes);
app.use(authRoutes);

export default app;
