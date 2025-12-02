const Model = require('../models/AvaliacaoModel');

async function getAllAvaliacoes(req, res) {
  try {
    const data = await Model.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getAvaliacaoById(req, res) {
  try {
    const row = await Model.getById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Não encontrado' });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function createAvaliacao(req, res) {
  try {
    const id = await Model.create(req.body);
    res.status(201).json({ ID_Avaliacao: id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function updateAvaliacao(req, res) {
  try {
    const affected = await Model.update(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ message: 'Não encontrado' });
    res.json({ message: 'Atualizado com sucesso' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function deleteAvaliacao(req, res) {
  try {
    const affected = await Model.remove(req.params.id);
    if (affected === 0) return res.status(404).json({ message: 'Não encontrado' });
    res.json({ message: 'Eliminado com sucesso' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getAllAvaliacoes,
  getAvaliacaoById,
  createAvaliacao,
  updateAvaliacao,
  deleteAvaliacao
};
