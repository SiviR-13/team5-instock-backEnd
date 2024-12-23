import express from "express";
import * as inventoryController from "../controllers/inventory-controller.js";
import fs from "fs";
const router = express.Router();

//Creating routes for inventory
router.route("/")
  .get(inventoryController.getAllInventories)

  .post(inventoryController.addInventory)  

// Route for fetching, updating, and deleting a single inventory by ID
router.route("/:id")
  .get(inventoryController.getInventoryById)

  .put(inventoryController.editInventory)
  
  .delete(inventoryController.deleteInventory);

router.get("/:id/inventories", (req, res) => {
  res.send(`GET inventory for inventory with ID: ${req.params.id}`);
});



export default router;
