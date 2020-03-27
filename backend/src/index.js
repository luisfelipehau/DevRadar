const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

//mongoose.connect('url'); put here your connection url

//app.use(cors());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(routes);


// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)


// MongoDB (Não-relacional)



server.listen(30333);

