// src/server.js
import app from "./app.js";
import sequelize from "./db.js";

const PORT = process.env.PORT || 8080;

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
