const { poolConnect, pool } = require('../db');

const TABLE = 'Orador';
const PK = 'ID_Orador';
const FIELDS = ['Nome', 'Biografia'];

async function getAll() {
  await poolConnect;
  const result = await pool.request().query(`SELECT * FROM ${TABLE}`);
  return result.recordset;
}

async function getById(id) {
  await poolConnect;
  const result = await pool.request()
    .input('id', id)
    .query(`SELECT * FROM ${TABLE} WHERE ${PK} = @id`);
  return result.recordset[0];
}

async function create(obj) {
  await poolConnect;
  const request = pool.request();
  FIELDS.forEach(f => request.input(f, obj[f]));

  const query = `
    INSERT INTO ${TABLE} (${FIELDS.join(', ')})
    OUTPUT INSERTED.${PK}
    VALUES (${FIELDS.map(f => '@' + f).join(', ')})
  `;
  const result = await request.query(query);
  return result.recordset[0][PK];
}

async function update(id, obj) {
  await poolConnect;
  const request = pool.request();
  FIELDS.forEach(f => request.input(f, obj[f]));
  request.input('id', id);

  const query = `
    UPDATE ${TABLE}
    SET ${FIELDS.map(f => `${f} = @${f}`).join(', ')}
    WHERE ${PK} = @id
  `;
  const result = await request.query(query);
  return result.rowsAffected[0];
}

async function remove(id) {
  await poolConnect;
  const result = await pool.request()
    .input('id', id)
    .query(`DELETE FROM ${TABLE} WHERE ${PK} = @id`);
  return result.rowsAffected[0];
}

module.exports = { getAll, getById, create, update, remove };
