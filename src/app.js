require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { init_db } = require("./sync");
const express = require("express");
const { Client } = require("pg");
const app = express();
const PORT = process.env.APP_PORT || 3000;

const usersRouter = require("./routes/userRouter");
const analysis = require("./routes/analysisRouter");
const skinRouter = require("./routes/skinRouter");
const treatmentRouter = require("./routes/treatmentRouter");
const skinAnalysisRecordRouter = require("./routes/skinAnalysisRecordRouter");
const adminRouter = require("./routes/adminRouter");
const environmentDataRouter = require("./routes/environmentDataRouter");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5435,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

init_db(client);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", environmentDataRouter);
app.use("/api/admin", adminRouter);
app.use("/api", usersRouter);
app.use("/api", analysis);
app.use("/api", skinRouter);
app.use("/api", treatmentRouter);
app.use("/api", skinAnalysisRecordRouter);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      withCredentials: true,
    },
  })
);
