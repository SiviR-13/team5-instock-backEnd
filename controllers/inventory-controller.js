import initKnex from "knex";
import configuration from "../knexfile.js";
import { createConnection } from "mysql2";

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

export const editInventory = async (req, res) => {
  const inventoryId = req.params.id;
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (isNaN(quantity) || Number(quantity) < 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be a non-negative, numeric value." });
  }

  if (!Number.isInteger(Number(quantity))) {
    return res
      .status(400)
      .json({ message: "Quantity must be a whole number." });
  }

  const warehouseExists = await knex("warehouses")
    .select("id")
    .where({ id: warehouse_id })
    .first();

  if (!warehouseExists) {
    return res.status(400).json({ message: "Invalid warehouse_id. Warehouse not found." });
  }

  try {
    const inventoryExists = await knex("inventories")
      .select("id")
      .where({ id: inventoryId })
      .first();

    if (!inventoryExists) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    const updatedInventory = {
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    };

    await knex("inventories")
      .where({ id: inventoryId })
      .update(updatedInventory);

    // Return the updated warehouse data
    res.status(200).json({ id: inventoryId, ...updatedInventory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
<<<<<<< HEAD
  

}

  //new
  export const addInventory = async (req, res) => {
    const {
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    } = req.body;
  
    // Validate request body
    if (
      !warehouse_id ||
      !item_name ||
      !description ||
      !category ||
      !status ||
      quantity == null
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    // Validate quantity (must be a number)
    if (typeof quantity !== "number" || quantity < 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a non-negative number." });
    }
  
    // Validate status
    const validStatuses = ["In Stock", "Out of Stock"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
  
    // Validate warehouse_id existence
    try {
      const warehouseExists = await knex("warehouses")
        .where({ id: warehouse_id })
        .first();
  
      if (!warehouseExists) {
        return res.status(400).json({ message: "Invalid warehouse_id." });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  
    // Add inventory item
    try {
      const newInventoryItem = {
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity,
      };
  
      const [insertedItemId] = await knex("inventories").insert(newInventoryItem);
  
      const addedItem = await knex("inventories")
        .where({ id: insertedItemId })
        .first();
  
      // Return the new inventory item data
      res.status(201).json({
        message: "Inventory item added successfully",
        inventory: addedItem,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

=======
};

// Delete request
export const deleteInventory = async (req, res) => {
  const inventoryId = req.params.id;

  try {
    const result = await knex("inventories")
      .where({ id: inventoryId })
      .del();

    if (!result) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
>>>>>>> develop
