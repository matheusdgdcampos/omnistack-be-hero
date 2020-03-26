const connection = require('../database/connection');

module.exports = {
    async index(request, response) {    //listagem de incidents
        const { page = 1 } = request.query;     //sistema de paginação

        const [count] = await connection('incidents').count();      //contando quantos registro tem no banco de dados

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)     //definindo qual página começar na paginação
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);

        response.header('X-Total-Count', count['count(*)'])     //definindo o número total de páginas que existe em incidents

        return response.json(incidents)
    },

    async create(request, response) {   //rota para cadastro de incidents
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {       //deletar incidents
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted" })  //se errar o id retorna um erro de status
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
};