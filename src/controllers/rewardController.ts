import { FastifyRequest, FastifyReply } from 'fastify';
import { createRewardSchema } from '../schemas/rewardSchemas';
import { createReward } from '../services/rewardServices';

export async function handleCreateReward(request: FastifyRequest, reply: FastifyReply) {
  const body = createRewardSchema.parse(request.body);

  // Pegando o ID do parceiro autenticado
  const partnerId = (request.user as any)?.id;

  if (!partnerId) {
    return reply.status(401).send({ message: 'Não autorizado' });
  }

  try {
    const reward = await createReward(body, partnerId);
    return reply.status(201).send(reward);
  } catch (err: any) {
    return reply.status(500).send({
      message: 'Erro ao criar recompensa',
      error: err.message,
    });
  }
}
