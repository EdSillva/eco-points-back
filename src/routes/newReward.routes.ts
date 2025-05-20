import { FastifyInstance, FastifyPluginOptions } from 'fastify';

async function newRewardRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post('/newReward', async (request, reply) => {
        // lógica para criar recompensa
        return { message: 'Recompensa criada' };
    });
}

export default newRewardRoutes;
