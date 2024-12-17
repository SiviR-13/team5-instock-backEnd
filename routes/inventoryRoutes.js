import express from "express";
const router = express.Router();

//Creating routes for warehouse
router.get("/",(req,res)=>{
    res.send('Get all warehouses');
});

router.get("/:id",(req,res)=>{
    res.send(`GET warehouse with ID: ${req.params.id}`);
});

router.get("/:id/inventory", (req, res) => {
    res.send(`GET inventory for warehouse with ID: ${req.params.id}`);
  });

  router.put("/:id", (req, res) => {
    res.send(`UPDATE warehouse with ID: ${req.params.id}`);
  });
  router.delete("/:id", (req, res) => {
    res.send(`DELETE warehouse with ID: ${req.params.id}`);
  });
  router.post("/", (req, res) => {
    res.send("CREATE a new warehouse");
  });
  module.exports = router;