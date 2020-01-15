const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index , show , store, update, destroy
module.exports = {
//async e await sao utilizados para fazer com que a funcao espera o retorno da api que pode demorar
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude  } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            let { name = login, avatar_url, bio } = apiResponse.data;
    
            // quebra o array onde tiver virgula e percorre o mesmo tirando os espacos
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
    
            dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
            });    
        }

        return response.json(dev);
    },

    async update(request, response) {
        const { id } = request.params.id;
        const { latitude, longitude, techs} = request.body;

        const techsArray = parseStringAsArray(techs);

        dev = await Dev.findByIdAndUpdate(
            id, 
            {
                latitude,
                longitude,
                techs
            },
            {new: true},

        );
        return response.json(dev);
    },

    async destroy(request, response) {
        const { id } = request.params.id;
        
        const dev = await Dev.findByIdAndDelete(id, function(err, dev){
            console.log('delete user');
            if(err){
                throw err;
            }
        });
        return response.json(dev);
    }
};