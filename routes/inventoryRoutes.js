import express from "express";
import fs from "fs";
const router = express.Router();

//Creating routes for inventory
router.route("/")
  .get((req, res) => {
    res.send("Get all inventory");
  })
  .post((req, res) => {
    res.send("CREATE a new inventory");
  });

router.route("/:id")
  .get((req, res) => {
    res.send(`GET inventory with ID: ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`UPDATE inventory with ID: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`DELETE inventory with ID: ${req.params.id}`);
  });

router.get("/:id/inventory", (req, res) => {
  res.send(`GET inventory for inventory with ID: ${req.params.id}`);
});

export default router;
