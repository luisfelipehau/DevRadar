const Dev = require('../models/Dev')
const parseString2Array = require('../utils/parseString2Array')

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs} = request.query;

        const techsArray = parseString2Array(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            },
        });

        return response.json({devs });
    }
}