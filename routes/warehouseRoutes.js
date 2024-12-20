import express from "express";
import * as warehousesController from "../controllers/warehouses-controller.js";
import { getInventoriesByWarehouseId } from "../controllers/inventory-controller.js";
const router = express.Router();

//Creating routes for warehouse
router
  .route("/")
  .get(warehousesController.index)

  .post((req, res) => {
    res.send("CREATE a new warehouse");
  });

// Edit warehouse
router.put("/:id", warehousesController.editWarehouse);

router
  .route("/:id")
  .get(warehousesController.getWarehouseById) // Use the controller to get warehouse by ID
  .put((req, res) => {
    res.send(`UPDATE warehouse with ID: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`DELETE warehouse with ID: ${req.params.id}`);
  });

router.get("/:id/inventory", getInventoriesByWarehouseId);

export default router;
