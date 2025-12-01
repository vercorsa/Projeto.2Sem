const { poolConnect, pool } = require('../db');

const TABLE = 'EventoRecurso';
const PK = 'ID'; // Correção importante: o nome da PK nesta tabela é 'ID', não 'ID_EventoRecurso'
const FIELDS = ['ID_Evento', 'ID_Recurso'];

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

  console.log('Dados recebidos em EventoRecurso:', obj); // Debug útil

  const request = pool.request();

  // Insere apenas os campos esperados, evitando erros com campos a mais
  request.input('ID_Evento', obj.ID_Evento);
  request.input('ID_Recurso', obj.ID_Recurso);

  const result = await request.query(`
    INSERT INTO ${TABLE} (ID_Evento, ID_Recurso)
    OUTPUT INSERTED.${PK}
    VALUES (@ID_Evento, @ID_Recurso)
  `);

  return result.recordset[0][PK];
}

async function update(id, obj) {
  await poolConnect;
  const request = pool.request();

  request.input('ID_Evento', obj.ID_Evento);
  request.input('ID_Recurso', obj.ID_Recurso);
  request.input('id', id);

  const result = await request.query(`
    UPDATE ${TABLE}
    SET ID_Evento = @ID_Evento, ID_Recurso = @ID_Recurso
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

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
