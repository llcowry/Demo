import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Convert object keys to a comma-separated string
const objectKeysToString = (obj) => Object.keys(obj).join(', ');

// Convert object values to a comma-separated string of placeholders
const objectValuesToPlaceholders = (obj) =>
  Object.keys(obj)
    .map(() => '?')
    .join(', ');

// Create SQL update query string dynamically
const createUpdateQueryString = (data) =>
  Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');

// Create SQL ORDER BY clause from a string
const createOrderByClause = (orderBy) => {
  if (!orderBy) {
    return 'ORDER BY id DESC';
  }
  return `ORDER BY ${orderBy}`;
};

/**
 * Insert Data into the database
 *
 * @param {string} table - The name of the table to insert data into.
 * @param {Object} data - An object containing the data to insert. Keys should match the column names.
 * @returns {Promise<Object>} - An object containing the status and message.
 */
export const insertData = async (table, data) => {
  const columns = objectKeysToString(data);
  const placeholders = objectValuesToPlaceholders(data);

  const insertQuery = `
    INSERT INTO ${table} (${columns})
    VALUES (${placeholders})
  `;

  try {
    await pool.execute(insertQuery, Object.values(data));
    return {
      status: 'success',
      msg: 'Data inserted successfully',
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `Error inserting data: ${error.message}`,
    };
  }
};

/**
 * Insert or Update Data in the database
 *
 * @param {string} table - The name of the table to save data into.
 * @param {Object} data - An object containing the data to save. Keys should match the column names.
 * @param {string} uniqueKey - The unique key to determine if the data should be updated.
 * @returns {Promise<Object>} - An object containing the status and message.
 */
export const saveData = async (table, data, uniqueKey) => {
  const columns = objectKeysToString(data);
  const placeholders = objectValuesToPlaceholders(data);
  const updateFields = createUpdateQueryString(data);

  const insertQuery = `
    INSERT INTO ${table} (${columns})
    VALUES (${placeholders})
    ON DUPLICATE KEY UPDATE
    ${updateFields}
  `;

  try {
    await pool.execute(insertQuery, [...Object.values(data), ...Object.values(data)]);
    return {
      status: 'success',
      msg: 'Data saved or updated successfully',
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `Error saving data: ${error.message}`,
    };
  }
};

/**
 * Update Data by ID in the database
 *
 * @param {string} table - The name of the table to update data in.
 * @param {number} id - The ID of the record to update.
 * @param {Object} data - An object containing the data to update. Keys should match the column names.
 * @param {string} [idField='id'] - The name of the ID field (defaults to 'id').
 * @returns {Promise<Object>} - An object containing the status, message, and affectedRows.
 */
export const updateDataById = async (table, id, data, idField = 'id') => {
  const updateFields = createUpdateQueryString(data);
  const updateQuery = `
    UPDATE ${table}
    SET ${updateFields}
    WHERE ${idField} = ?
  `;

  try {
    const [result] = await pool.execute(updateQuery, [...Object.values(data), id]);
    return {
      status: 'success',
      msg: `Data with ${idField} ${id} updated successfully`,
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `Error updating data: ${error.message}`,
    };
  }
};

/**
 * Delete Data by ID in the database
 *
 * @param {string} table - The name of the table to delete data from.
 * @param {number} id - The ID of the record to delete.
 * @param {string} [idField='id'] - The name of the ID field (defaults to 'id').
 * @returns {Promise<Object>} - An object containing the status, message, and affectedRows.
 */
export const deleteDataById = async (table, id, idField = 'id') => {
  const deleteQuery = `
    DELETE FROM ${table}
    WHERE ${idField} = ?
  `;

  try {
    const [result] = await pool.execute(deleteQuery, [id]);
    return {
      status: 'success',
      msg: `Data with ${idField} ${id} deleted successfully`,
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `Error deleting data: ${error.message}`,
    };
  }
};

/**
 * Retrieve Paginated Data from the database
 *
 * @param {string} table - The name of the table to retrieve data from.
 * @param {number} page - The page number to retrieve.
 * @param {number} [pageSize=10] - The number of records per page (defaults to 10).
 * @param {string} [whereClause=''] - Optional SQL WHERE clause.
 * @param {Array} [whereValues=[]] - Optional array of values for the WHERE clause.
 * @param {string} [orderBy='id DESC'] - String specifying the columns and directions to order by.
 * @returns {Promise<Object>} - An object containing the status, message, data, and totalCount.
 */
export const getPaginatedData = async (table, page, pageSize = 10, whereClause = '', whereValues = [], orderBy = 'id DESC') => {
  const offset = (page - 1) * pageSize;
  const orderByClause = createOrderByClause(orderBy);
  const dataQuery = `
    SELECT * FROM ${table}
    ${whereClause}
    ${orderByClause}
    LIMIT ? OFFSET ?
  `;
  const countQuery = `
    SELECT COUNT(*) as totalCount FROM ${table}
    ${whereClause}
  `;

  try {
    const [dataResults] = await pool.execute(dataQuery, [...whereValues, pageSize, offset]);
    const [countResults] = await pool.execute(countQuery, whereValues);
    const totalCount = countResults[0].totalCount;
    return {
      status: 'success',
      msg: 'Data retrieved successfully',
      data: dataResults,
      totalCount,
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `Error fetching paginated data: ${error.message}`,
      data: [],
      totalCount: 0,
    };
  }
};

/**
 * Retrieve List Data from the database
 *
 * @param {string} table - The name of the table to retrieve data from.
 * @param {string} [whereClause=''] - Optional SQL WHERE clause.
 * @param {Array} [whereValues=[]] - Optional array of values for the WHERE clause.
 * @param {string} [orderBy='id DESC'] - String specifying the columns and directions to order by.
 * @returns {Promise<Object>} - An object containing the status, message, and data.
 */
export const getListData = async (table, whereClause = '', whereValues = [], orderBy = 'id DESC') => {
  const orderByClause = createOrderByClause(orderBy);
  const query = `
    SELECT * FROM ${table}
    ${whereClause}
    ${orderByClause}
  `;

  try {
    const [results] = await pool.execute(query, whereValues);
    return {
      status: 'success',
      msg: 'Data retrieved successfully',
      data: results,
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `Error fetching list data: ${error.message}`,
      data: [],
    };
  }
};

/**
 * Retrieve Detailed Data by ID from the database
 *
 * @param {string} table - The name of the table to retrieve data from.
 * @param {number} id - The ID of the record to retrieve.
 * @param {string} [idField='id'] - The name of the ID field (defaults to 'id').
 * @returns {Promise<Object>} - An object containing the status, message, and data.
 */
export const getDetailDataById = async (table, id, idField = 'id') => {
  const query = `SELECT * FROM ${table} WHERE ${idField} = ?`;

  try {
    const [results] = await pool.execute(query, [id]);
    return {
      status: 'success',
      msg: 'Data retrieved successfully',
      data: results,
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `Error fetching detail data: ${error.message}`,
      data: [],
    };
  }
};
