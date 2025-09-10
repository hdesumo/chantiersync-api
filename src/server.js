import express from "express";
import sequelize from "./db.js"; // <-- notre nouvelle instance Sequelize
import routes from "./routes/index.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", routes);

sequelize.authenticate()
  .then(() => {
    console.log("✅ DB connected successfully");
    app.listen(PORT, () => {
      console.log(`API listening on :${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1); // évite de démarrer si DB down
  });
