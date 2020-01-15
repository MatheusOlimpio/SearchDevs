const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Metodos HTTP: get, post, put, delete

// Tipos de Parametros:
// Query Params: req.query ( Filtros, ordenacao, paginacao, ...)
// Route Params: request.params (Identificar um recurso na alteracao ou remocao)
// Body: request.body (Dados para criacao ou alteracao de um registro)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);
// exportas o modulo de rotas para outro arquivo
module.exports = routes;

// fazer chamadas para outras API utilizando axios. yarn add axios