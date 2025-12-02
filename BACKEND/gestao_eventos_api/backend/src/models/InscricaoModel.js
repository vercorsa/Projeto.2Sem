const { poolConnect, pool } = require('../db');

const TABLE = 'Inscricao';
const PK = 'ID_Inscricao';
const FIELDS = ['ID_Utilizador', 'ID_Evento', 'Status'];

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

  const result = await request.query(`
    INSERT INTO ${TABLE} (${FIELDS.join(',')})
    OUTPUT INSERTED.${PK}
    VALUES (${FIELDS.map(f => '@' + f).join(',')})
  `);

  return result.recordset[0][PK];
}

async function update(id, obj) {
  await poolConnect;
  const request = pool.request();
  FIELDS.forEach(f => request.input(f, obj[f]));
  request.input('id', id);

  const result = await request.query(`
    UPDATE ${TABLE}
    SET ${FIELDS.map(f => `${f} = @${f}`).join(', ')}
    WHERE ${PK} = @id
  `);

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
