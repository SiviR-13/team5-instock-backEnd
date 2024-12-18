import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (req, res) => {
  try {
    const data = await knex('warehouses');
    res.status(200).json(data);
  } catch(error) {
    res.status(404).send(`Warehouses not found: ${error}`)
  }
}

export {
  index
}