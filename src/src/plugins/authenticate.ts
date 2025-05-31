import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';

const authenticatePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('authenticate', async function (
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      await request.jwtVerify(); // ou sua lógica de autenticação
    } catch (err) {
      reply.status(401).send({ message: 'Unauthorized' });
    }
  });
};

export default fp(authenticatePlugin);



