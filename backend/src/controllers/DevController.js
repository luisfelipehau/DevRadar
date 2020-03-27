const axios = require('axios');
const Dev = require('../models/Dev');
const parseString2Array = require('../utils/parseString2Array');
const { findConnections, sendMessage } = require('../websocket');

// index, show, store, update, destroy

module.exports = {
    async index (request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async update (request, response){
        
    },

    async destroy (request, response){
        const github_username = request.query.github_username;
        
        const destroyDev = await Dev.deleteOne({github_username});

        return response.json({message: "OK, deleted.", destroyDev});

    },

    async update (request, response){
        const {github_username, techs} = request.body;

        techsArray = parseString2Array(techs);

        const dev = await Dev.updateOne({github_username}, {techs: techsArray});

        return response.json(dev);
    },

    async store (request, response) {
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username})

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            //depois do await receber os dados
        
            //console.log(apiResponse.data)
        
            //const {name = login, avatar_url, bio } = apiResponse.data;
        
            let {name , avatar_url, bio } = apiResponse.data;
        
            if(!name) {
                name = apiResponse.data.login;
            }
        
            const techsArray = parseString2Array(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        
            //console.log(name, avatar_url, bio, github_username);

            //Filtrar as conexoes que estao no maximo 10km de distancia
            //E que o novo dev tenha pelo menos um das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            //console.log(sendSocketMessageTo);
            sendMessage(sendSocketMessageTo, 'newDev', dev);

        }
               
    
        return response.json(dev);
    },
};