import express, { Express } from "express";
import bodyParser from "body-parser";
import mainRoutes from "./routes";
import cors from "cors";
const port = process.env.PORT;
const app: Express = express();

// Middlewares
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

// Routes
app.use(mainRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
