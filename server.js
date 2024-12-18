import "dotenv/config";
import express from "express";
import cors from 'cors';

//Initializing Express APP
const app = express();
const PORT=process.env.PORT || 8080;

//Middleware

app.use(cors()); //To allow cross origin requests
app.use(express.json());//To parse JSON request bodies

//Import routes
app.use("/routes/warehouses", warehouseRoutes);
app.use("/routes/inventories", inventoryRoutes);
// Server Port
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});