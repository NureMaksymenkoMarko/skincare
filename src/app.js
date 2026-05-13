require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { models } = require("./models");
const express = require("express");
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

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://skincare-l0s7.onrender.com",
    ],
    credentials: true,
  })
);

async function ensureSkinCardsForUsers() {
  try {
    const users = await models.User.findAll();

    for (const user of users) {
      const existingSkin = await models.Skin.findOne({
        where: { user_id: user.id },
      });

      if (!existingSkin) {
        await models.Skin.create({
          user_id: user.id,
          type: "Не визначено",
          description:
            "Картка шкіри створена автоматично для користувача без профілю шкіри",
        });
      }
    }

    console.log("Skin cards check completed");
  } catch (error) {
    console.error("Skin cards check error:", error.message);
  }
}

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

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await ensureSkinCardsForUsers();
});