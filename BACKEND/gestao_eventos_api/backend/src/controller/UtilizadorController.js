// src/controllers/UtilizadorController.js
const Model = require('../models/UtilizadorModel');
const bcrypt = require('bcrypt');

async function getAllUtilizadores(req, res) {
  try {
    const data = await Model.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getUtilizadorById(req, res) {
  try {
    const row = await Model.getById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Não encontrado' });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function createUtilizador(req, res) {
  try {
    const id = await Model.create(req.body);
    res.status(201).json({ ID_Utilizador: id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function updateUtilizador(req, res) {
  try {
    const affected = await Model.update(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ message: 'Não encontrado' });
    res.json({ message: 'Atualizado com sucesso' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function deleteUtilizador(req, res) {
  try {
    const affected = await Model.remove(req.params.id);
    if (affected === 0) return res.status(404).json({ message: 'Não encontrado' });
    res.json({ message: 'Eliminado com sucesso' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function login(req, res) {
  try {
    const { Email, PalavraPasse } = req.body;

    if (!Email || !PalavraPasse) {
      return res.status(400).json({ error: 'Email e PalavraPasse são obrigatórios.' });
    }

    const user = await Model.getByEmail(Email);

    if (!user) {
      return res.status(401).json({ error: 'Utilizador não encontrado' });
    }

    const match = await bcrypt.compare(PalavraPasse, user.PalavraPasse);

    if (!match) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.status(200).json({
      message: 'Login bem-sucedido',
      ID_Utilizador: user.ID_Utilizador,
      Nome: user.Nome,
      Email: user.Email,
      TipoUtilizador: user.TipoUtilizador
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getAllUtilizadores,
  getUtilizadorById,
  createUtilizador,
  updateUtilizador,
  deleteUtilizador,
  login
};
