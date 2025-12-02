const { poolConnect, pool } = require('../db');
const bcrypt = require('bcrypt');

const TABLE = 'Utilizador';
const PK = 'ID_Utilizador';
const FIELDS = ['Nome', 'Email', 'Telefone', 'TipoUtilizador', 'PalavraPasse', 'ImagemPerfil'];

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

async function getByEmail(email) {
  await poolConnect;
  const result = await pool.request()
    .input('email', email)
    .query(`SELECT * FROM ${TABLE} WHERE Email = @email`);
  return result.recordset[0];
}

async function create(obj) {
  await poolConnect;
  const request = pool.request();

  // Criptografar senha
  const hashedPassword = await bcrypt.hash(obj.PalavraPasse, 10);

  request.input('Nome', obj.Nome);
  request.input('Email', obj.Email);
  request.input('Telefone', obj.Telefone);
  request.input('TipoUtilizador', obj.TipoUtilizador);
  request.input('PalavraPasse', hashedPassword);
  request.input('ImagemPerfil', obj.ImagemPerfil || '');

  const result = await request.query(`
    INSERT INTO ${TABLE} (${FIELDS.join(',')})
    OUTPUT INSERTED.${PK}
    VALUES (@Nome, @Email, @Telefone, @TipoUtilizador, @PalavraPasse, @ImagemPerfil)
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
    SET ${FIELDS.map(f => f + ' = @' + f).join(', ')}
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
  getByEmail,
  create,
  update,
  remove
};
