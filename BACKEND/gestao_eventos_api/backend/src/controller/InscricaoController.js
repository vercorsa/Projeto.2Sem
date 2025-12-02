const Model = require('../models/InscricaoModel');

async function getAllInscricoes(req, res) {
  try {
    const data = await Model.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getInscricaoById(req, res) {
  try {
    const row = await Model.getById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Não encontrado' });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function createInscricao(req, res) {
  try {
    const id = await Model.create(req.body);
    res.status(201).json({ ID_Inscricao: id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function updateInscricao(req, res) {
  try {
    const affected = await Model.update(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ message: 'Não encontrado' });
    res.json({ message: 'Atualizado com sucesso' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function deleteInscricao(req, res) {
  try {
    const affected = await Model.remove(req.params.id);
    if (affected === 0) return res.status(404).json({ message: 'Não encontrado' });
    res.json({ message: 'Eliminado com sucesso' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getAllInscricoes,
  getInscricaoById,
  createInscricao,
  updateInscricao,
  deleteInscricao
};
