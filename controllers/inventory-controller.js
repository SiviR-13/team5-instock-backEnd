import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// Fetch all inventories
export const getAllInventories = async (req, res) => {
  try {
    const inventories = await knex("inventories").select("*");
    res.status(200).json(inventories);
  } catch (error) {
    res.status(404).send(`Inventories not found: ${error.message}`);
  }
};

export const getInventoriesByWarehouseId = async (req, res) => {
  const warehouseId = req.params.id;

  try {
    const warehouseExists = await knex("warehouses")
      .select("id")
      .where({ id: warehouseId })
      .first();

    if (!warehouseExists) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const inventories = await knex("inventories")
      .select("*")
      .where({ warehouse_id: warehouseId });

    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
