import "dotenv/config";
import express from "express";
import cors from "cors";
import warehouseRoutes from "./routes/warehouseRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

//Initializing Express APP
const app = express();
const PORT = process.env.PORT || 8080;

//Middleware

app.use(cors()); //To allow cross origin requests
app.use(express.json()); //To parse JSON request bodies

//Import routes

app.use("/warehouses", warehouseRoutes)
app.use("/inventories", inventoryRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
