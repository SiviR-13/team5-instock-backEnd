import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Fetch all warehouses
export const fetchWarehouses = async (req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (error) {
    res.status(404).send(`Warehouses not found: ${error}`);
  }
};

// Fetch a specific warehouse by ID
export const getWarehouseById = async (req, res) => {
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

export const deleteWarehouseById = async (req, res) => {
  try {
    const rowsDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found` });
    }

    res.status(204).json("Warehouse deleted successfully");
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${error}`,
    });
  }
};

// Edit warehouse
export const editWarehouse = async (req, res) => {
  const warehouseId = req.params.id;
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  // Validate request body
  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Validate phone number (basic regex)
  const phoneRegex = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
  if (!phoneRegex.test(contact_phone)) {
    return res.status(400).json({ message: "Invalid phone number format." });
  }

  // Validate email (basic regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contact_email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    // Check if the warehouse exists
    const warehouseExists = await knex("warehouses")
      .select("id")
      .where({ id: warehouseId })
      .first();

    if (!warehouseExists) {
      return res.status(404).json({ message: "Warehouse not found." });
    }

    // Update the warehouse
    const updatedWarehouse = {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    };

    await knex("warehouses")
      .where({ id: warehouseId })
      .update(updatedWarehouse);

    // Return the updated warehouse data
    res.status(200).json({ id: warehouseId, ...updatedWarehouse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addWarehouse = async (req, res) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  // Validate request body
  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Validate phone number (basic regex)
  const phoneRegex = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
  if (!phoneRegex.test(contact_phone)) {
    return res.status(400).json({ message: "Invalid phone number format." });
  }

  // Validate email (basic regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contact_email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // add the warehouse
  try {
    const newWarehouse = {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    };

    const [insertedWarehouseId] = await knex("warehouses").insert(newWarehouse);

    const addedWarehouse = await knex("warehouses")
      .where({ id: insertedWarehouseId })
      .first();

    // Return the new warehouse data
    res.status(201).json({ message: "Warehouse added successfully", warehouse: addedWarehouse});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
    quantity === undefined
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Validate quantity (must be a number)
  if (typeof quantity !== "number") {
    return res.status(400).json({ message: "Quantity must be a number." });
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
