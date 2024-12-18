import express from "express";
import * as warehousesController from '../controllers/warehouses-controller.js'
const router = express.Router();

//Creating routes for warehouse
router.route("/")
  .get(warehousesController.index)
  
  .post((req, res) => {
    res.send("CREATE a new warehouse");
  });

router.route("/:id")
  .get((req, res) => {
    res.send(`GET warehouse with ID: ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`UPDATE warehouse with ID: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`DELETE warehouse with ID: ${req.params.id}`);
  });

router.get("/:id/inventory", (req, res) => {
  res.send(`GET inventory for warehouse with ID: ${req.params.id}`);
});

export default router;
