const express = require("express");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/authRoute");
const connectDb = require("./config/dbConnection");
const reportRoute = require("./routes/reportRoutes");
const errorHandler = require("./middleware/errorHandling");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const cors = require("cors");
app = express();

app.use(cors());

connectDb();
const port = process.env.PORT;
app.use(express.json());

//routes
app.use("/auth", userRoutes);
app.use("/api/report", reportRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log("done");
});
