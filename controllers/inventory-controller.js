import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// Fetch all inventories
export const getAllInventories = async (req, res) => {
  try {
    // Fetch inventories joined with warehouse names
    const inventories = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "warehouses.id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name AS warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );

    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).send(`Error fetching inventories: ${error.message}`);
  }
};
// Single inventory item by ID
export const getInventoryById = async (req, res) => {
  const inventoryId = req.params.id;
  try {
    const inventoryItem = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "warehouses.id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name AS warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .where("inventories.id", inventoryId)
      .first();
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
