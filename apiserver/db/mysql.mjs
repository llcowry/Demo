import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// 创建 MySQL 连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST, // 数据库主机
  user: process.env.DB_USER, // 数据库用户名
  password: process.env.DB_PASSWORD, // 数据库密码
  database: process.env.DB_NAME, // 数据库名称
});

// 将对象的键转换为逗号分隔的字符串
const objectKeysToString = (obj) => Object.keys(obj).join(', ');

// 将对象的值转换为占位符的逗号分隔字符串
const objectValuesToPlaceholders = (obj) =>
  Object.keys(obj)
    .map(() => '?')
    .join(', ');

// 动态创建 SQL 更新查询字符串
const createUpdateQueryString = (data) =>
  Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');

// 根据排序字符串创建 SQL ORDER BY 子句
const createOrderByClause = (orderBy) => {
  if (!orderBy) {
    return 'ORDER BY id DESC'; // 默认按 id 降序排序
  }
  return `ORDER BY ${orderBy}`;
};

/**
 * 插入数据
 *
 * @param {string} table - 要插入数据的表名
 * @param {Object} data - 包含要插入的数据的对象，键应与列名匹配
 * @returns {Promise<Object>} - 包含状态和消息的对象
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
      msg: '数据插入成功',
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `插入数据时发生错误：${error.message}`,
    };
  }
};

/**
 * 保存或更新数据
 *
 * @param {string} table - 要保存数据的表名
 * @param {Object} data - 包含要保存的数据的对象，键应与列名匹配
 * @param {string} uniqueKey - 用于确定是否更新数据的唯一键
 * @returns {Promise<Object>} - 包含状态和消息的对象
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
      msg: '数据保存或更新成功',
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `保存数据时发生错误：${error.message}`,
    };
  }
};

/**
 * 根据 ID 更新数据库中的数据
 *
 * @param {string} table - 要更新数据的表名
 * @param {number} id - 要更新记录的 ID
 * @param {Object} data - 包含要更新的数据的对象，键应与列名匹配
 * @param {string} [idField='id'] - ID 字段的名称（默认为 'id'）
 * @returns {Promise<Object>} - 包含状态、消息和受影响行数的对象
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
      msg: `ID 为 ${idField} ${id} 的数据更新成功`,
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `更新数据时发生错误：${error.message}`,
    };
  }
};

/**
 * 根据 ID 从数据库中删除数据
 *
 * @param {string} table - 要从中删除数据的表名
 * @param {number} id - 要删除记录的 ID
 * @param {string} [idField='id'] - ID 字段的名称（默认为 'id'）
 * @returns {Promise<Object>} - 包含状态、消息和受影响行数的对象
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
      msg: `ID 为 ${idField} ${id} 的数据删除成功`,
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    return {
      status: 'error',
      msg: `删除数据时发生错误：${error.message}`,
    };
  }
};

/**
 * 根据 ID 从数据库中检索详细数据
 *
 * @param {string} table - 要从中检索数据的表名
 * @param {number} id - 要检索记录的 ID
 * @param {string} [idField='id'] - ID 字段的名称（默认为 'id'）
 * @returns {Promise<Object>} - 包含状态、消息和数据的对象
 */
export const getDataById = async (table, id, idField = 'id') => {
  const query = `SELECT * FROM ${table} WHERE ${idField} = ?`;

  try {
    const [results] = await pool.execute(query, [id]);
    if (results.length === 0) {
      return {
        status: 'error',
        msg: `未找到 ${idField} 为 ${id} 的数据`,
        data: [],
      };
    } else {
      return {
        status: 'success',
        msg: `${idField} 为 ${id} 的数据检索成功`,
        data: results,
      };
    }
  } catch (error) {
    return {
      status: 'error',
      msg: `检索详情数据时发生错误：${error.message}`,
      data: [],
    };
  }
};

/**
 * 从数据库中分页检索数据
 *
 * @param {string} table - 要从中检索数据的表名
 * @param {number} page - 要检索的页码
 * @param {number} [pageSize=10] - 每页的记录数（默认为 10）
 * @param {string} [whereClause=''] - 可选的 SQL WHERE 子句
 * @param {Array} [whereValues=[]] - WHERE 子句的值数组
 * @param {string} [orderBy='id DESC'] - 指定按列和方向排序的字符串
 * @returns {Promise<Object>} - 包含状态、消息、数据和总记录数的对象
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
    if (dataResults.length === 0) {
      return {
        status: 'error',
        msg: `未找到数据`,
        data: [],
        totalCount: 0,
      };
    } else {
      return {
        status: 'success',
        msg: '数据检索成功',
        data: dataResults,
        totalCount,
      };
    }
  } catch (error) {
    return {
      status: 'error',
      msg: `检索分页数据时发生错误：${error.message}`,
      data: [],
      totalCount: 0,
    };
  }
};

/**
 * 从数据库中检索列表数据
 *
 * @param {string} table - 要从中检索数据的表名
 * @param {string} [whereClause=''] - 可选的 SQL WHERE 子句
 * @param {Array} [whereValues=[]] - WHERE 子句的值数组
 * @param {string} [orderBy='id DESC'] - 指定按列和方向排序的字符串
 * @returns {Promise<Object>} - 包含状态、消息和数据的对象
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
    if (results.length === 0) {
      return {
        status: 'error',
        msg: `未找到数据`,
        data: [],
      };
    } else {
      return {
        status: 'success',
        msg: '数据检索成功',
        data: results,
      };
    }
  } catch (error) {
    return {
      status: 'error',
      msg: `检索列表数据时发生错误：${error.message}`,
      data: [],
    };
  }
};

/**
 * 关闭数据库连接池
 */
export const closePool = async () => {
  try {
    await pool.end();
    console.log('数据库连接池已关闭');
  } catch (error) {
    console.error('关闭数据库连接池时发生错误：', error.message);
  }
};