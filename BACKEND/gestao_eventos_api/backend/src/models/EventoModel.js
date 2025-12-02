const { poolConnect, pool } = require('../db');

const TABLE = 'Evento';
const PK = 'ID_Evento';
const FIELDS = [
  'Nome',
  'Data',
  'DataFim',
  'Local',
  'TipoEvento',           // BOOLEAN (0 = Gratuito, 1 = Pago)
  'Descricao',
  'LimiteParticipantes',
  'AvaliacaoMedia'        // FLOAT DEFAULT 0
];

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

  // Adiciona os campos do objeto no request
  FIELDS.forEach(f => request.input(f, obj[f]));

  // Executa a query de INSERT e retorna o ID inserido
  const result = await request.query(`
    INSERT INTO ${TABLE} (${FIELDS.join(', ')})
    OUTPUT INSERTED.${PK}
    VALUES (${FIELDS.map(f => '@' + f).join(', ')})
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

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
