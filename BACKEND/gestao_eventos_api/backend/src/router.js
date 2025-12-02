const express = require('express');
const router  = express.Router();

// Controllers
const UCtrl    = require('./controller/UtilizadorController');
const CCtrl    = require('./controller/CategoriaController');
const EvtCtrl  = require('./controller/EventoController');
const SalaCtrl = require('./controller/SalaController');
const RecCtrl  = require('./controller/RecursoController');
const OraCtrl  = require('./controller/OradorController');
const ESalaCtrl= require('./controller/EventoSalaController');
const ERecCtrl = require('./controller/EventoRecursoController');
const EOrCtrl  = require('./controller/EventoOradorController');
const ECateCtrl= require('./controller/EventoCategoriaController');
const PCtrl    = require('./controller/PreferenciaCategoriaController');
const InsCtrl  = require('./controller/InscricaoController');
const BilCtrl  = require('./controller/BilheteController');
const AvalCtrl = require('./controller/AvaliacaoController');
const ComCtrl  = require('./controller/ComentarioController');
const NotCtrl  = require('./controller/NotificacaoController');

// Rotas Utilizador
router.get('/utilizadores',       UCtrl.getAllUtilizadores);
router.get('/utilizadores/:id',   UCtrl.getUtilizadorById);
router.post('/utilizadores',      UCtrl.createUtilizador);
router.put('/utilizadores/:id',   UCtrl.updateUtilizador);
router.delete('/utilizadores/:id',UCtrl.deleteUtilizador);
router.post('/login',             UCtrl.login); // Nova rota de login aqui

// Rotas Categoria
router.get('/categorias',      CCtrl.getAllCategorias);
router.get('/categorias/:id',  CCtrl.getCategoriaById);
router.post('/categorias',     CCtrl.createCategoria);
router.put('/categorias/:id',  CCtrl.updateCategoria);
router.delete('/categorias/:id',CCtrl.deleteCategoria);

// Rotas Evento
router.get('/eventos',  EvtCtrl.getAllEventos);
router.get('/eventos/:id',EvtCtrl.getEventoById);
router.post('/eventos', EvtCtrl.createEvento);
router.put('/eventos/:id',EvtCtrl.updateEvento);
router.delete('/eventos/:id',EvtCtrl.deleteEvento);

// Rotas Sala
router.get('/salas',    SalaCtrl.getAllSalas);
router.get('/salas/:id',SalaCtrl.getSalaById);
router.post('/salas',   SalaCtrl.createSala);
router.put('/salas/:id',SalaCtrl.updateSala);
router.delete('/salas/:id',SalaCtrl.deleteSala);

// Rotas Recurso
router.get('/recursos', RecCtrl.getAllRecursos);
router.get('/recursos/:id',RecCtrl.getRecursoById);
router.post('/recursos',RecCtrl.createRecurso);
router.put('/recursos/:id',RecCtrl.updateRecurso);
router.delete('/recursos/:id',RecCtrl.deleteRecurso);

// Rotas Orador
router.get('/oradores',OraCtrl.getAllOradores);
router.get('/oradores/:id',OraCtrl.getOradorById);
router.post('/oradores',OraCtrl.createOrador);
router.put('/oradores/:id',OraCtrl.updateOrador);
router.delete('/oradores/:id',OraCtrl.deleteOrador);

// Rotas EventoSala
router.get('/evento-salas', ESalaCtrl.getAllEventoSalas);
router.get('/evento-salas/:id',ESalaCtrl.getEventoSalaById);
router.post('/evento-salas',ESalaCtrl.createEventoSala);
router.put('/evento-salas/:id',ESalaCtrl.updateEventoSala);
router.delete('/evento-salas/:id',ESalaCtrl.deleteEventoSala);

// Rotas EventoRecurso
router.get('/evento-recursos', ERecCtrl.getAllEventoRecursos);
router.get('/evento-recursos/:id',ERecCtrl.getEventoRecursoById);
router.post('/evento-recursos',ERecCtrl.createEventoRecurso);
router.put('/evento-recursos/:id',ERecCtrl.updateEventoRecurso);
router.delete('/evento-recursos/:id',ERecCtrl.deleteEventoRecurso);

// Rotas EventoOrador
router.get('/evento-oradores',EOrCtrl.getAllEventoOradores);
router.get('/evento-oradores/:id',EOrCtrl.getEventoOradorById);
router.post('/evento-oradores',EOrCtrl.createEventoOrador);
router.put('/evento-oradores/:id',EOrCtrl.updateEventoOrador);
router.delete('/evento-oradores/:id',EOrCtrl.deleteEventoOrador);

// Rotas EventoCategoria
router.get('/evento-categorias',ECateCtrl.getAllEventoCategorias);
router.get('/evento-categorias/:id',ECateCtrl.getEventoCategoriaById);
router.post('/evento-categorias',ECateCtrl.createEventoCategoria);
router.put('/evento-categorias/:id',ECateCtrl.updateEventoCategoria);
router.delete('/evento-categorias/:id',ECateCtrl.deleteEventoCategoria);

// Rotas PreferenciaCategoria
router.get('/preferencias',PCtrl.getAllPreferencias);
router.get('/preferencias/:id',PCtrl.getPreferenciaById);
router.post('/preferencias',PCtrl.createPreferencia);
router.put('/preferencias/:id',PCtrl.updatePreferencia);
router.delete('/preferencias/:id',PCtrl.deletePreferencia);

// Rotas Inscricao
router.get('/inscricoes',InsCtrl.getAllInscricoes);
router.get('/inscricoes/:id',InsCtrl.getInscricaoById);
router.post('/inscricoes',InsCtrl.createInscricao);
router.put('/inscricoes/:id',InsCtrl.updateInscricao);
router.delete('/inscricoes/:id',InsCtrl.deleteInscricao);

// Rotas Bilhete
router.get('/bilhetes',BilCtrl.getAllBilhetes);
router.get('/bilhetes/:id',BilCtrl.getBilheteById);
router.post('/bilhetes',BilCtrl.createBilhete);
router.put('/bilhetes/:id',BilCtrl.updateBilhete);
router.delete('/bilhetes/:id',BilCtrl.deleteBilhete);

// Rotas Avaliacao
router.get('/avaliacoes',AvalCtrl.getAllAvaliacoes);
router.get('/avaliacoes/:id',AvalCtrl.getAvaliacaoById);
router.post('/avaliacoes',AvalCtrl.createAvaliacao);
router.put('/avaliacoes/:id',AvalCtrl.updateAvaliacao);
router.delete('/avaliacoes/:id',AvalCtrl.deleteAvaliacao);

// Rotas Comentario
router.get('/comentarios',ComCtrl.getAllComentarios);
router.get('/comentarios/:id',ComCtrl.getComentarioById);
router.post('/comentarios',ComCtrl.createComentario);
router.put('/comentarios/:id',ComCtrl.updateComentario);
router.delete('/comentarios/:id',ComCtrl.deleteComentario);

// Rotas Notificacao
router.get('/notificacoes',NotCtrl.getAllNotificacoes);
router.get('/notificacoes/:id',NotCtrl.getNotificacaoById);
router.post('/notificacoes',NotCtrl.createNotificacao);
router.put('/notificacoes/:id',NotCtrl.updateNotificacao);
router.delete('/notificacoes/:id',NotCtrl.deleteNotificacao);

module.exports = router;
