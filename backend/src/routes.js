const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchControler = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.delete('/devs', DevController.destroy);
routes.put('/devs', DevController.update);

routes.get('/search', SearchControler.index)

module.exports = routes;