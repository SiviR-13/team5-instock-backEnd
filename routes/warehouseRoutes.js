import express from "express";
import * as warehousesController from "../controllers/warehouses-controller.js";
import { getInventoriesByWarehouseId } from "../controllers/inventory-controller.js";
const router = express.Router();

//Creating routes for warehouse
router.route("/")
  .get(warehousesController.fetchWarehouses)

  .post((req, res) => {
    res.send("CREATE a new warehouse");
  });

router.route("/:id")
  .get(warehousesController.getWarehouseById) // Use the controller to get warehouse by ID
  .put((req, res) => {
    res.send(`UPDATE warehouse with ID: ${req.params.id}`);
  })
  .delete(warehousesController.deleteWarehouseById);

router.get("/:id/inventory", getInventoriesByWarehouseId);

export default router;
