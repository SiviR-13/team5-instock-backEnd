import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Fetch all warehouses
const index = async (req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (error) {
    res.status(404).send(`Warehouses not found: ${error}`);
  }
};

// Fetch a specific warehouse by ID
const getWarehouseById = async (req, res) => {
  const { id } = req.params;

  try {
    const warehouse = await knex("warehouses").where({ id }).first();
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    res.status(200).json(warehouse);
  } catch (error) {
    console.error("Error fetching warehouse:", error);
    res.status(500).send(`Error retrieving warehouse details: ${error}`);
  }
};

export { index, getWarehouseById };
