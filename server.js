require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const playerRoutes = require("./src/views/playerViews");
const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use("/players", playerRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
