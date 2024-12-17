import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
const router = express.Router();

//Creating routes for inventory
router.get("/",(req,res)=>{
    res.send('Get all inventory');
});

router.get("/:id",(req,res)=>{
    res.send(`GET inventory with ID: ${req.params.id}`);
});

router.get("/:id/inventory", (req, res) => {
    res.send(`GET inventory for inventory with ID: ${req.params.id}`);
  });

  router.put("/:id", (req, res) => {
    res.send(`UPDATE inventory with ID: ${req.params.id}`);
  });
  router.delete("/:id", (req, res) => {
    res.send(`DELETE inventory with ID: ${req.params.id}`);
  });
  router.post("/", (req, res) => {
    res.send("CREATE a new inventory");
  });
  module.exports = router;